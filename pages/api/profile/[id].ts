import type { NextApiRequest, NextApiResponse } from "next"
import { getProfileByAddress, getProfileByShort } from "@/lib/redis"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: userShortOrAddr } = req.query as { id: string }
  const exitWithError = (status: number, error: string) =>
    res.status(status).send({ error })

  if (req.method === "GET") {
    let user
    if (userShortOrAddr.length > 9) {
      // taking input as an address
      user = await getProfileByAddress(userShortOrAddr)
    } else {
      user = await getProfileByShort(userShortOrAddr)
    }
    // fresh for 5s. Stale till 15s
    res.setHeader("Cache-Control", "max-age=5, stale-while-revalidate=15")
    res.status(200).send(user)
  } else {
    exitWithError(404, "Item not found")
  }
}
