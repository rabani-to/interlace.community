import type { NextApiRequest, NextApiResponse } from "next"
import type { Profile } from "@/types/shared"

import PROFILE, { PROFILE_DETAILS } from "@/lib/models/profile"
import { createProfile } from "@/lib/redis"

const OMIT = [
  PROFILE_DETAILS.profileImage,
  PROFILE_DETAILS.refCode,
  PROFILE_DETAILS.telegram,
  PROFILE_DETAILS.twitter,
]
const ALL_PROFILE_KEYS = Object.keys(PROFILE).filter(
  (key) => !OMIT.includes(key)
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.body as Profile
  const exitWithError = (status: number, error: string) =>
    res.status(status).send({ error })

  if (req.method === "POST") {
    for (let key of ALL_PROFILE_KEYS) {
      const value = (user as any)[key]
      if (!value || value.length < 1) {
        return exitWithError(400, `Property @${key} is missing.`)
      }
    }
    await createProfile(user)
    res.status(200).send({ status: "success" })
  } else {
    exitWithError(404, "Item not found")
  }
}
