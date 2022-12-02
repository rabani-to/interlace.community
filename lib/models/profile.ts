import { Details, Experience, Preferences, ProfileExtras } from "@/types/shared"

type enforceString<T, K extends keyof T> = Omit<T, K> & {
  [T in K]: string
}

export const PROFILE_DETAILS: Details = {
  /** IS_OPTIONAL */
  profileImage: "profileImage",
  /** IS_OPTIONAL */
  refCode: "refCode",
  /** IS_OPTIONAL */
  telegram: "telegram",
  /** IS_OPTIONAL */
  twitter: "twitter",
  address: "address",
}

export const PROFILE_EXPERIENCE: enforceString<Experience, "expertise"> = {
  role: "role",
  description: "description",
  portfolio: "portfolio",
  expertise: "expertise",
}

export const PROFILE_PREFERENCES: Preferences = {
  commitment: "commitment",
  hourlyRate: "hourlyRate",
  paymentOptions: "paymentOptions",
  workingTime: "workingTime",
}

export const PROFILE_EXTRAS: ProfileExtras = {
  headline: "headline",
  name: "name",
  about: {
    mission: "mission",
    contribution: "contribution",
    whatILookFor: "whatILookFor",
  },
}

export default {
  ...PROFILE_DETAILS,
  ...PROFILE_EXPERIENCE,
  ...PROFILE_PREFERENCES,
  ...PROFILE_EXTRAS,
} as const
