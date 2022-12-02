import { type PropsWithChildren } from "react"

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
  telegram: string
  /** NO_REQ */
  twitter: string
  /** NO_REQ */
  refCode: string
  /** NO_REQ */
  profileImage: string
}

export type Profile = Details &
  Preferences &
  Experience & {
    address: string
  }

export type ProfileWithShort = Profile & {
  shortId: string
}

export type ProfileInterestingThings = {
  missionVision: string
  contribution: string
  whatILookFor: string
}

export type ProfileWithExtras = ProfileWithShort & {
  headline: string
  name: string
  interestingThings: ProfileInterestingThings
}

export type PropsWithChildrenCx<Props = any> = PropsWithChildren<Props> & {
  className?: string
}

export type PublicProfileSection = {
  isPublicView?: boolean
  profile: Profile | null
}
