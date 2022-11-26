import type { Profile, ProfileWithShort } from "@/types/shared"
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

export const getShortStoreKey = (short: string) => `short.${short}`
export const getAddressShortStoreKey = (address: string) => `${address}.short`

export async function createProfile(profile: Profile) {
  // get a short uid for user
  const shortId = nanoid()
  // get short's store key
  const shortKey = getShortStoreKey(shortId)
  const addressShortKey = getAddressShortStoreKey(profile.address)
  await Promise.all([
    // set user object mapped to it's [address]
    redis.set(profile.address, profile),
    // alias [address].short to [short]
    redis.set(addressShortKey, shortId),
    // * alias [short] to [address]
    // short->address->Profile
    redis.set(shortKey, profile.address),
  ])
}

export async function getProfileShortId(address: string) {
  // get a short uid for user
  const addressShortKey = getAddressShortStoreKey(address)
  const userShortId = await redis.get<string>(addressShortKey)
  if (userShortId) {
    return createResponse(userShortId, true)
  }
  return createResponse(null, false)
}

export async function getProfileByShort(shortId: string) {
  // get a short uid for user
  const shortKey = getShortStoreKey(shortId)
  const userAddress = await redis.get(shortKey)
  if (userAddress) {
    const profile = await redis.get<ProfileWithShort>(userAddress as string)
    return createResponse({ ...profile, shortId }, true)
  }
  return createResponse(null, false)
}

export async function getProfileByAddress(address: string) {
  const profile = await redis.get<ProfileWithShort>(address as string)
  if (profile) {
    const { data: shortId } = await getProfileShortId(address)
    return createResponse({ ...profile, shortId }, true)
  }
  return createResponse(null, false)
}
