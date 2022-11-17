export const PROFILE_DETAILS = {
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

export const PROFILE_EXPERIENCE = {
  role: "role",
  description: "description",
  portfolio: "portfolio",
  expertise: "expertise",
}

export const PROFILE_PREFERENCES = {
  commitment: "commitment",
  hourlyRate: "hourlyRate",
  paymentOptions: "paymentOptions",
}

export default {
  ...PROFILE_DETAILS,
  ...PROFILE_EXPERIENCE,
  ...PROFILE_PREFERENCES,
} as const
