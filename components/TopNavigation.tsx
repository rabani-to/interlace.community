import Link from "next/link"
import useHybridAccount from "@/lib/hooks/useHybridAccount"
import { beautifyAddress, classnames } from "@/lib/helpers"

import { GrFormClose } from "react-icons/gr"
import ConnectButton from "./ConnectButton"
import InterlaceLogo from "./InterLaceLogo"
import Button from "./Button"

function TopNavigation({
  withWallet,
  isHeadless,
}: {
  withWallet?: boolean
  isHeadless?: boolean
}) {
  return (
    <nav
      className={classnames(
        isHeadless ||
          "mt-16 z-10 py-3 bg-gradient-to-r from-transparent via-[#ffffff07]",
        "flex items-center space-x-2"
      )}
    >
      <Link title="Go to homepage" href="/">
        <InterlaceLogo />
      </Link>
      <div className="flex-grow lg:hidden" />
      <div className="hidden text-white/80 flex-grow lg:flex space-x-8 items-center justify-center">
        <Link
          className="hover:text-white"
          target="_blank"
          href="https://kryl7dqx6wo.typeform.com/to/Srgs9NCE"
        >
          Build in Web3
        </Link>
        <Link className="hover:text-white" target="_blank" href="/onboarding">
          Contribute to Web3
        </Link>
      </div>
      {withWallet ? <HybridWalletButton /> : <ConnectButton />}
    </nav>
  )
}

function HybridWalletButton() {
  const { address, disconnect, openConnectModal } = useHybridAccount()

  if (address) {
    return (
      <div className="flex items-center bg-white rounded-lg text-black">
        <span className="px-4 font-bold">{beautifyAddress(address)}</span>
        <Button
          title="Disconnect wallet"
          onClick={disconnect}
          borderRadius="rounded-r-lg"
          className="bg-white border-l font-bold text-black"
        >
          <GrFormClose className="text-2xl" />
        </Button>
      </div>
    )
  }
  return (
    <Button
      onClick={openConnectModal}
      fontSize="text-base"
      className="bg-white font-bold text-black"
    >
      Connect wallet
    </Button>
  )
}

export default TopNavigation
