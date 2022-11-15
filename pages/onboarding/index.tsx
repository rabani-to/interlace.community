import { Fragment, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { DAppClient } from "@airgap/beacon-sdk"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount, useConnect, useProvider } from "wagmi"
import { useRouter } from "next/router"

import { getMagicConnector } from "@/lib/magic"
import { noOp } from "@/lib/helpers"
import SeoTags from "@/components/SeoTags"
import Button from "@/components/Button"

import asset_stars from "@/assets/stars.svg"
import asset_profilerow from "@/assets/profilerow-lg.png"

const beaconDAppClient = new DAppClient({ name: "interlace.community" })
export default function Onboarding() {
  const router = useRouter()
  const { chains } = useProvider()
  const { connect: connectWithMagicLink } = useConnect({
    connector: getMagicConnector(chains),
  })
  const { isConnected } = useAccount()
  const { openConnectModal = noOp } = useConnectModal()
  function handleConnectWallet() {
    openConnectModal()
  }

  function handleConnectEmail() {
    connectWithMagicLink()
  }

  async function handleConnectWithBeacon() {
    const activeAccount = await beaconDAppClient.getActiveAccount()
    const redirect = () => router.push("experience/")
    if (activeAccount) {
      redirect()
    } else {
      beaconDAppClient
        .requestPermissions()
        .then((permissions) => {
          console.debug({ permissions })
          redirect()
        })
        .catch(noOp)
    }
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
        <section className="w-full px-6 lg:w-1/2 h-full bg-white flex items-center justify-center">
          <div className="w-full flex flex-col space-y-4 max-w-xs text-center">
            <div>
              <h3 className="font-bold">Connect Wallet</h3>
              <p className="text-zinc-500 mt-2">
                Choose how you want to connect. There are several wallet
                providers.
              </p>
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              <Button
                flavor="violet"
                isFormItem
                onClick={handleConnectWithBeacon}
              >
                Tezos Beacon Wallet
              </Button>
              <Button flavor="violet" isFormItem onClick={handleConnectWallet}>
                Metamask / WalletConnect
              </Button>
              <span className="text-zinc-500">Or</span>
              <Button
                isFormItem
                onClick={handleConnectEmail}
                className="bg-zinc-100 text-black/70"
              >
                Use email instead
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
            <p>Join 2000+ Contributors</p>
          </div>
        </section>
      </main>
    </Fragment>
  )
}
