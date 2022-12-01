import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount, useConnect, useProvider } from "wagmi"
import { useRouter } from "next/router"

import { getMagicConnector } from "@/lib/magic"
import { beautifyAddress, noOp } from "@/lib/helpers"
import useRemoteProfileData from "@/lib/hooks/useRemoteProfileData"
import SeoTags from "@/components/SeoTags"
import Button from "@/components/Button"

import { BsArrowRight } from "react-icons/bs"
import asset_stars from "@/assets/stars.svg"
import asset_profilerow from "@/assets/profilerow-lg.png"

export default function Onboarding() {
  const router = useRouter()
  const { chains } = useProvider()
  const { connect: connectWithMagicLink } = useConnect({
    connector: getMagicConnector(chains),
  })
  const { address } = useAccount()
  const remoteProfile = useRemoteProfileData(address!)
  const { openConnectModal = noOp } = useConnectModal()
  const { openAccountModal = noOp } = useAccountModal()

  function handleConnectWallet() {
    if (address) {
      openAccountModal()
    } else openConnectModal()
  }

  function handleConnectEmail() {
    connectWithMagicLink()
  }

  function handleContinue() {
    if (remoteProfile.isOk) {
      // If remote profile exists redirect to dashboard view
      router.push("/dashboard")
    } else {
      // Else we onboard the new user
      router.push("/onboarding/experience")
    }
  }

  return (
    <Fragment>
      <SeoTags title="InterLace | Create your profile" />
      <main className="flex items-center h-screen text-zinc-800 font-normal">
        <section className="w-full lg:overflow-auto px-6 lg:w-1/2 h-full bg-white flex items-center justify-center">
          <div className="w-full pt-8 pb-4 flex flex-col space-y-4 max-w-xs text-center">
            <div>
              <h3 className="font-bold">Connect Wallet</h3>
              <p className="text-zinc-500 mt-2">
                Choose how you want to connect. There are several wallet
                providers.
              </p>
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              <Button flavor="violet" isFormItem onClick={handleConnectWallet}>
                {address
                  ? `Connected (${beautifyAddress(address)})`
                  : "Connect wallet"}
              </Button>
              {address ? null : (
                <Fragment>
                  <span className="text-zinc-500">Or</span>
                  <Button
                    isFormItem
                    onClick={handleConnectEmail}
                    className="bg-zinc-100 text-black/70"
                  >
                    Use email instead
                  </Button>
                </Fragment>
              )}
            </div>
            {address && (
              <section className="pt-4">
                <Button
                  onClick={handleContinue}
                  className="w-full border border-zinc-100 !gap-2"
                  isFormItem
                >
                  <span>Continue</span>
                  <BsArrowRight className="text-lg group-hover:translate-x-px" />
                </Button>
              </section>
            )}
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
        <section className="hidden lg:flex flex-col justify-center space-y-4 w-1/2 px-32 overflow-auto h-full text-white bg-darker">
          <div className="w-20 h-20 mx-4">
            <Image src={asset_stars} alt="" />
          </div>
          <p className="text-5xl font-bold leading-normal">
            Create your Web3 profile and get connected with opportunities.
          </p>
          <p className="text-lg text-white/80">
            We{"'"}re so glad to have you in this space. Let{"'"}s build this
            community of creators together.
          </p>
          <div className="flex pt-12 mx-4 items-center space-x-4">
            <Image height={42} src={asset_profilerow} alt="" />
            <p>Join 1000+ Contributors</p>
          </div>
        </section>
      </main>
    </Fragment>
  )
}
