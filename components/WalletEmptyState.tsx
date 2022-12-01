import Link from "next/link"
import { useConnectModal } from "@rainbow-me/rainbowkit"

import Button from "@/components/Button"
import { LayoutItem } from "@/components/layouts/GradientSection"

function WalletEmptyState() {
  const { openConnectModal } = useConnectModal()
  return (
    <LayoutItem>
      <section className="min-h-screen pt-24 text-center">
        <h2>Connect your wallet</h2>

        <p className="mt-4 text-lg text-zinc-400">
          You must connect your{" "}
          <Link
            className="underline"
            target="_blank"
            href="https://learn.rainbow.me/crypto-and-wallets"
          >
            wallet
          </Link>{" "}
          to continue using{" "}
          <Link className="underline" href="/">
            InterLace.
          </Link>
        </p>
        <div className="flex justify-center mt-12">
          <Button
            onClick={openConnectModal}
            className="border-2 border-white !text-base"
          >
            Connect wallet
          </Button>
        </div>
      </section>
    </LayoutItem>
  )
}

export default WalletEmptyState
