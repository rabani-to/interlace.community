import { noOp } from "@/lib/helpers"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import Button from "./Button"

function MagikConnect() {
  const { openConnectModal = noOp } = useConnectModal()
  function handleConnect() {
    // Request to connect from wagmi client using magic.link rpc
    openConnectModal()
  }

  return (
    <Button
      onClick={handleConnect}
      fontSize="text-base"
      className="bg-white font-bold text-black"
    >
      Connect Wallet
    </Button>
  )
}

function ConnectButton() {
  return <MagikConnect />
}

export default ConnectButton
