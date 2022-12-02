import toast from "react-hot-toast"
import { utils } from "ethers"
import { useSignMessage } from "wagmi"
import { makeInterLaceSigMessageId } from "@/lib/helpers"

function useSignProfileUpdate() {
  const { signMessageAsync } = useSignMessage()

  async function requestSigAsync<Profile>(
    profile: Profile
  ): Promise<(Profile & { signature: string }) | null> {
    try {
      const signature = await signMessageAsync({
        message: makeInterLaceSigMessageId(utils.id(JSON.stringify(profile))),
      })!
      console.debug({ signature })
      return { ...profile, signature }
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
