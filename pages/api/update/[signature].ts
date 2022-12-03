import type { NextApiRequest, NextApiResponse } from "next"
import { utils } from "ethers"

import { getProfileByAddress, updateProfile } from "@/lib/redis"
import { makeInterLaceSigMessageId } from "@/lib/helpers"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { signature } = req.query as { signature: string }
  const exitWithError = (status: number, error: string) =>
    res.status(status).send({ error })

  if (req.method === "POST") {
    const { raw: rawProfileData } = (req.body || {}) as { raw: string }
    const { message } = makeInterLaceSigMessageId(rawProfileData)

    // We get the signer of this content update
    const signer = utils.verifyMessage(message, signature)
    const currentUserData = await getProfileByAddress(signer)
    if (currentUserData === null || signer !== currentUserData.data?.address) {
      // Terminate if user is not existent or address missmatch
      return exitWithError(400, "Bad request")
    }

    // Now we know user is remote available so proceed to update
    const mergedProfileData = Object.assign(
      currentUserData.data,
      JSON.parse(rawProfileData)
    )
    await updateProfile(mergedProfileData)
    res.status(200).send({ status: "success" })
  } else {
    exitWithError(404, "Item not found")
  }
}
