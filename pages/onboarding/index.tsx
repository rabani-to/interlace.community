import { Fragment, type PropsWithChildren } from "react"
import Link from "next/link"

import SeoTags from "@/components/SeoTags"
import Button from "@/components/Button"
import Image from "next/image"

import asset_stars from "@/assets/stars.svg"
import asset_profilerow from "@/assets/profilerow-lg.png"

function WalletButton({ children }: PropsWithChildren) {
  return (
    <Button
      fontSize="text-base"
      className="bg-violet-600 font-bold justify-center"
    >
      {children}
    </Button>
  )
}

export default function Onboarding() {
  return (
    <Fragment>
      <SeoTags title="Say welcome to opportunities." />
      <main className="flex items-center h-screen text-zinc-800 font-normal">
        <section className="w-1/2 h-full bg-white flex items-center justify-center">
          <div className="w-full flex flex-col space-y-4 max-w-sm text-center">
            <h3 className="font-bold text-3xl">Connect Wallet</h3>
            <p className="text-zinc-500">
              Choose how you want to connect. There are several wallet
              providers.
            </p>
            <div className="flex flex-col space-y-4 text-white">
              <WalletButton>Metamask</WalletButton>
              <WalletButton>Magic</WalletButton>
              <WalletButton>Beacon</WalletButton>
              <WalletButton>NEAR</WalletButton>
            </div>
            <p className="text-zinc-500">
              <span className="pt-2 pb-6">Don{"'"}t have a wallet?</span>
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
