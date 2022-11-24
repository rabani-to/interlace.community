import type { NextApiRequest, NextApiResponse } from "next"
import { getProfileByShort } from "@/lib/redis"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: userShortId } = req.query as { id: string }
  const exitWithError = (status: number, error: string) =>
    res.status(status).send({ error })

  if (req.method === "GET") {
    const user = await getProfileByShort(userShortId)
    // fresh for 5s. Stale till 60s
    res.setHeader("Cache-Control", "max-age=5, stale-while-revalidate=59")
    res.status(200).send(user)
  } else {
    exitWithError(404, "Item not found")
  }
}
