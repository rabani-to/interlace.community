import toast from "react-hot-toast"
import { useSignMessage } from "wagmi"
import { makeInterLaceSigMessageId } from "@/lib/helpers"

function useSignProfileUpdate() {
  const { signMessageAsync } = useSignMessage()

  async function requestSigAsync<Profile>(
    profileData: Profile
  ): Promise<string | null> {
    try {
      const { message } = makeInterLaceSigMessageId(JSON.stringify(profileData))
      const signature = await signMessageAsync({
        message,
      })!
      console.debug({ signature })
      return signature
    } catch (_) {
      toast.error("User denied signature request")
    }
    return null
  }

  return {
    requestSigAsync,
  }
}

export default useSignProfileUpdate
