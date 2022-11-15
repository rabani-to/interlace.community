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
  twitter: string
  refCode: string
  profileImage: File
}

export type Profile = Details &
  Preferences &
  Experience & {
    address: string
  }
