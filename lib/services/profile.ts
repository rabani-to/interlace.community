import ff from "./ff"

const updateProfile = (signature: string, profileData: any) => {
  return ff.post(["/update", signature], {
    body: JSON.stringify({
      raw: JSON.stringify(profileData),
    }),
  })
}

export default {
  updateProfile,
} as const
