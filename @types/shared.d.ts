import { type PropsWithChildren } from "react"

export type Experience = {
  role: string
  expertise: string[]
  description: string
  portfolio: string
}

export type Preferences = {
  commitment: string
  paymentOptions: string[]
  hourlyRate: string
}

export type Details = {
  telegram: string
  /** NO_REQ */
  twitter: string
  /** NO_REQ */
  refCode: string
  /** NO_REQ */
  profileImage: File
}

export type Profile = Details &
  Preferences &
  Experience & {
    address: string
  }

export type PropsWithChildrenCx<Props = any> = PropsWithChildren<Props> & {
  className?: string
}
