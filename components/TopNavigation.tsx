import Link from "next/link"
import useHybridAccount from "@/lib/hooks/useHybridAccount"
import { beautifyAddress, classnames } from "@/lib/helpers"

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
      <InterlaceLogo />
      <div className="flex-grow lg:hidden" />
      <div className="hidden text-white/80 flex-grow lg:flex space-x-8 items-center justify-center">
        <Link
          className="hover:text-white"
          target="_blank"
          href="https://kryl7dqx6wo.typeform.com/to/Srgs9NCE"
        >
          Explore Talent
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
  const { address } = useHybridAccount()
  const formattedAddrr = beautifyAddress(address)
  return (
    <Button fontSize="text-base" className="bg-white font-bold text-black">
      {address ? formattedAddrr : "Not connected"}
    </Button>
  )
}

export default TopNavigation
