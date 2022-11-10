import type { PropsWithChildren } from "react"
import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

import { FiArrowUpRight } from "react-icons/fi"

import asset_profilerow from "@/assets/profilerow.png"
import asset_ctaimage from "@/assets/ctaimage.png"
import Contributors from "@/components/Contributors"
import ConnectButton from "@/components/ConnectButton"
import Button from "@/components/Button"
import SeoTags from "@/components/SeoTags"

export default function Home() {
  return (
    <Fragment>
      <SeoTags />
      <main>
        <GradientSection className="relative pb-[50vh]">
          <nav className="mt-16 z-10 py-3 flex bg-gradient-to-r from-transparent via-[#ffffff07] rounded-xl items-center space-x-2">
            <InterlaceLogo />
            <div className="flex flex-grow space-x-8 items-center justify-center">
              <Link
                target="_blank"
                href="https://kryl7dqx6wo.typeform.com/to/P8EeBCob"
              >
                Explore Contributors
              </Link>
              <button>Become a contributor</button>
            </div>
            <ConnectButton />
          </nav>
          <div className="flex min-h-[calc(50vh+12rem)] mt-12 flex-grow items-center">
            <section className="w-full">
              <h2 className="text-5xl">Connect.Contribute.Build</h2>
              <p className="text-zinc-400 leading-relaxed text-xl mt-4 mb-8 max-w-xl">
                Welcome to InterLace, where decentralized organizations can
                connect with individual problem solvers by task.
              </p>
              <div className="flex items-center space-x-4 text-black">
                <Button className="bg-blue-300">
                  <span>Create Contributor Profile</span>
                  <FiArrowUpRight />
                </Button>
                <Button
                  isLink
                  target="_blank"
                  href="https://kryl7dqx6wo.typeform.com/to/P8EeBCob"
                  className="bg-white"
                >
                  <span>Explore Contributors</span>
                  <FiArrowUpRight />
                </Button>
              </div>
              <div className="flex mt-8 items-center space-x-4">
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
                  className="max-w-[50vw] rounded-3xl"
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
            <h2 className="text-5xl">Contributor Community Skillsets</h2>
            <p className="text-zinc-400 leading-relaxed text-lg mt-2 mb-8 max-w-xl">
              With a team of experts around the globe, we take care of the small
              day-to-day tasks so you can focus on your main business
              objectives.
            </p>
            <Contributors />
            <Button
              isLink
              target="_blank"
              fontSize="text-base"
              href="https://kryl7dqx6wo.typeform.com/to/P8EeBCob"
              className="bg-black/60 mt-8 text-white"
            >
              <span>Explore Contributors</span>
              <FiArrowUpRight />
            </Button>
          </div>
        </GradientSection>
      </main>
      <LayoutItem as="footer" className="pt-24 min-h-[10rem]">
        <div className="flex space-x-4">
          <div className=" flex-grow">
            <InterlaceLogo />
            <p className="mt-4 max-w-sm text-zinc-400 text-sm leading-relaxed">
              Our platform is built for decentralized organizations to connect
              with individual problem solvers.
            </p>
          </div>
          <div className="flex space-x-4 justify-evenly flex-grow">
            <div className="flex flex-col">
              <h3 className="text-lg mb-4">Community</h3>
              <FooterLink withIcon>Discord</FooterLink>
              <FooterLink withIcon>Telegram</FooterLink>
              <FooterLink withIcon>Twitter</FooterLink>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg mb-4">Support</h3>
              <FooterLink>Community</FooterLink>
              <FooterLink>Guidelines</FooterLink>
              <FooterLink>Terms of Service</FooterLink>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg mb-4">Company</h3>
              <FooterLink>About</FooterLink>
              <FooterLink>Roadmap</FooterLink>
              <FooterLink>Carreers</FooterLink>
            </div>
          </div>
        </div>
        <p className="w-full text-center mt-32 mb-12">
          © 2022 Exclusive Inc. All rights reserved. — Privacy Policy · Terms of
          Service
        </p>
      </LayoutItem>
    </Fragment>
  )
}

function FooterLink({
  withIcon,
  children,
}: PropsWithChildren<{
  withIcon?: boolean
}>) {
  return (
    <Link
      className="flex items-center space-x-2 text-white/60 py-2 font-light"
      href="/#"
    >
      <span>{children}</span>
      {withIcon && <FiArrowUpRight />}
    </Link>
  )
}

function InterlaceLogo() {
  return (
    <div className="flex items-center space-x-2">
      <figure className="bg-white w-10 h-10 rounded-full"></figure>
      <h3 className="text-2xl">InterLace</h3>
    </div>
  )
}

function LayoutItem({
  children,
  className,
  as: ElementType,
}: PropsWithChildren<{ as?: string; className?: string }>) {
  const Wrapper = (ElementType || "div") as any
  return (
    <Wrapper
      className={`flex flex-col w-full px-8 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </Wrapper>
  )
}

function GradientSection({
  children,
  className,
}: PropsWithChildren<{
  className?: string
}>) {
  return (
    <section data-type="texture-wrapper" className={`relative ${className}`}>
      <div
        data-type="texture"
        className="inset-0 absolute pointer-events-none"
      />
      <LayoutItem className="relative z-[1]">{children}</LayoutItem>
    </section>
  )
}
