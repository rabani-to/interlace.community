import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { noOp } from "@/lib/helpers"

function useHybridAccount() {
  const { openConnectModal = noOp } = useConnectModal()
  const { address } = useAccount()

  return {
    address,
    openConnectModal,
    disconnect: () => {
      location.reload()
    },
  }
}

export default useHybridAccount
