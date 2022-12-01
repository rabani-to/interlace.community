import { Fragment } from "react"
import Image from "next/image"

import GradientSection from "@/components/layouts/GradientSection"
import asset_profilerow from "@/assets/profilerow.png"
import asset_ctaimage from "@/assets/ctaimage.png"
import Contributors from "@/components/Contributors"
import Button from "@/components/Button"
import SeoTags from "@/components/SeoTags"
import AnimatedLinkArrow from "@/components/AnimatedLinkArrow"
import TopNavigation from "@/components/TopNavigation"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <Fragment>
      <SeoTags />
      <GradientSection className="relative pb-[50vh] overflow-hidden">
        <TopNavigation />
        <div className="flex flex-col md:flex-row min-h-[calc(50vh+12rem)] mt-12 flex-grow items-center">
          <section className="z-[1] w-full text-center md:text-left">
            <h2>Building the future of work in Web3</h2>
            <p className="text-zinc-400 leading-relaxed text-xl mt-4 mb-8 max-w-xl">
              Welcome to InterLace, where decentralized organizations can
              deliver on projects with top talent.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 text-black">
              <Button
                isLink
                target="_blank"
                href="https://kryl7dqx6wo.typeform.com/to/Srgs9NCE"
                data-type="texturized"
                className="bg-blue-300"
              >
                <span>Build with Web3 Expertise</span>
                <AnimatedLinkArrow />
              </Button>
              <Button
                isLink
                href="/onboarding"
                target="_blank"
                className="bg-white"
              >
                <span>Create Web3 Profile</span>
                <AnimatedLinkArrow />
              </Button>
            </div>
            <div className="hidden md:flex mt-8 items-center space-x-4">
              <Image
                height={42}
                placeholder="blur"
                className="overflow-hidden rounded-2xl"
                alt=""
                src={asset_profilerow}
              />
              <p className="text-xl">
                <strong>Join 1000+</strong> Vetted Contributors
              </p>
            </div>
          </section>
          <section className="relative w-full h-[50vh]">
            <div className="absolute left-0 top-0">
              <Image
                className="max-w-[40rem] min-w-[30rem] md:max-w-[50vw] rounded-3xl"
                placeholder="blur"
                alt=""
                src={asset_ctaimage}
              />
            </div>
          </section>
        </div>
      </GradientSection>
      <GradientSection className="bg-darker pb-24">
        <div className="flex gap-4 flex-col items-center mt-16 text-center">
          <h2>Connect.Contribute.Build</h2>
          <p className="text-zinc-400 leading-relaxed text-lg mt-2 mb-8 max-w-xl">
            InterLace connects decentralized organizations with top talent and
            delivers what matters.
          </p>
          <Contributors />
          <Button
            isLink
            target="_blank"
            fontSize="text-base"
            href="https://kryl7dqx6wo.typeform.com/to/Srgs9NCE"
            className="bg-black/60 mt-8 text-white"
          >
            <span>Explore Contributors</span>
            <AnimatedLinkArrow />
          </Button>
        </div>
      </GradientSection>
      <Footer />
    </Fragment>
  )
}
