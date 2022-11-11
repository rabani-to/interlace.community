import { Fragment, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"

import { noOp } from "@/lib/helpers"
import SeoTags from "@/components/SeoTags"
import Button from "@/components/Button"

import asset_stars from "@/assets/stars.svg"
import asset_profilerow from "@/assets/profilerow-lg.png"

export default function Onboarding() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { openConnectModal = noOp } = useConnectModal()
  function handleConnectWallet() {
    openConnectModal()
  }
  function handleConnectEmail() {
    // TODO
  }

  useEffect(() => {
    if (isConnected) {
      router.push("/onboarding/experience")
    }
  }, [isConnected])

  return (
    <Fragment>
      <SeoTags title="InterLace | Create your profile" />
      <main className="flex items-center h-screen text-zinc-800 font-normal">
        <section className="w-1/2 h-full bg-white flex items-center justify-center">
          <div className="w-full flex flex-col space-y-4 max-w-sm text-center">
            <h3 className="font-bold">Connect Wallet</h3>
            <p className="text-zinc-500">
              Choose how you want to connect. There are several wallet
              providers.
            </p>
            <div className="flex flex-col space-y-2">
              <Button flavor="violet" isFormItem onClick={handleConnectWallet}>
                Connect with wallet
              </Button>
              <span className="text-zinc-500">Or</span>
              <Button
                isFormItem
                onClick={handleConnectEmail}
                className="bg-zinc-100 text-black/70"
              >
                Magic Link
              </Button>
            </div>
            <p className="text-zinc-500 text-sm pt-6">
              <span>Don{"'"}t have a wallet yet?</span>
              <br />
              <Link
                className="text-violet-600 font-bold inline-flex items-center space-x-px"
                target="_blank"
                href="https://rainbow.me/"
              >
                We can help
              </Link>
            </p>
          </div>
        </section>
        <section className="w-1/2 px-32 overflow-auto h-full text-white bg-darker flex flex-col justify-center space-y-4">
          <div className="w-20 h-20 mx-4">
            <Image src={asset_stars} alt="" />
          </div>
          <p className="text-5xl font-bold leading-normal">
            Create your Web3 profile and get connected with opportunities.
          </p>
          <p className="text-lg">
            We{"'"}re so glad to have you in this space. Let{"'"}s build this
            community of creators together.
          </p>
          <div className="flex pt-12 mx-4 items-center space-x-4">
            <Image height={42} src={asset_profilerow} alt="" />
            <p>Join 2000+ Contributors</p>
          </div>
        </section>
      </main>
    </Fragment>
  )
}
