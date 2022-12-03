import { type PropsWithChildren } from "react"

// * Core profile defintions used for registration
export type Experience = {
  role: string
  expertise: string[]
  description: string
  portfolio: string
}

export type Preferences = {
  commitment: string
  paymentOptions: string
  hourlyRate: string
  workingTime: string
}

export type Details = {
  address: string
  telegram: string
  /** NO_REQ */
  twitter: string
  /** NO_REQ */
  refCode: string
  /** NO_REQ */
  profileImage: string
}

/**
 * Exports core profile
 */
export type Profile = Details & Preferences & Experience

export type AboutExtras = {
  mission: string
  contribution: string
  whatILookFor: string
}
export type ProfileExtras = {
  headline: string
  name: string
  about: AboutExtras
}

export type ProfileWithExtras = Profile & ProfileExtras

export type ProfileWithShort = ProfileWithExtras & {
  shortId: string
}

// * Utility typedefs

export type PropsWithChildrenCx<Props = any> = PropsWithChildren<Props> & {
  className?: string
}

export type PublicProfileSection = {
  isPublicView?: boolean
  profile: ProfileWithShort | null
}

export type SignedProfile = {
  signature: string
  profile: Partial<ProfileWithShort>
}
