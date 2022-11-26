import type { Profile } from "@/types/shared"
import { Redis } from "@upstash/redis"
import { nanoid } from "@/lib/nanoid"

export type RedisResponse<T> = {
  data: T
  status: "error" | "success"
  isOk: boolean
}

const redis = Redis.fromEnv()

// Resolver helper function
const createResponse = <R>(data: R, isOk: boolean): RedisResponse<R> => {
  return {
    data,
    isOk,
    status: isOk ? "success" : "error",
  }
}

export const getShortKey = (short: string) => `short.${short}`

export async function createProfile(profile: Profile) {
  // get a short uid for user
  const short = nanoid()
  // get short's store key
  const shortKey = getShortKey(short)
  await Promise.all([
    // set user object mapped to it's [address]
    redis.set(profile.address, profile),
    // alias [address].short to [short]
    redis.set(`${profile.address}.short`, shortKey),
    // * alias [short] to [address]
    // short->address->Profile
    redis.set(shortKey, profile.address),
  ])
}

export async function getProfileByShort(short: string) {
  // get a short uid for user
  const shortKey = getShortKey(short)
  const userAddress = await redis.get(shortKey)
  if (userAddress) {
    const profile = await redis.get(userAddress as string)
    return createResponse(profile as Profile, true)
  }
  return createResponse(null, false)
}

export async function getProfileByAddress(address: string) {
  const profile = await redis.get(address as string)
  if (profile) {
    return createResponse(profile as Profile, true)
  }
  return createResponse(null, false)
}
