import { type PropsWithChildren } from "react"
import Link from "next/link"

import { LayoutItem } from "@/components/layouts/GradientSection"
import AnimatedLinkArrow from "./AnimatedLinkArrow"
import InterlaceLogo from "./InterLaceLogo"

function Footer() {
  return (
    <LayoutItem as="footer" className="pt-24">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <InterlaceLogo />
          <p className="mt-4 max-w-sm text-zinc-400 text-sm leading-relaxed">
            Our platform is built for decentralized organizations to connect
            with individual problem solvers.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 justify-between lg:justify-evenly flex-grow">
          <div className="flex flex-col">
            <h4 className="mb-4">Community</h4>
            <FooterLink href="https://t.me/InterlaceHQ" withIcon>
              Telegram
            </FooterLink>
            <FooterLink href="https://twitter.com/Interlacehq" withIcon>
              Twitter
            </FooterLink>
          </div>
          <div className="flex flex-col">
            <h4 className="mb-4">Support</h4>
            <FooterLink href="https://t.me/InterlaceHQ">Community</FooterLink>
            <FooterLink>Terms of Service</FooterLink>
          </div>
          <div className="flex flex-col">
            <h4 className="mb-4">Company</h4>
            <FooterLink href="https://interlace.notion.site/Executive-Summary-5c6ab5f141ac4c8a9bd71f136e720ff4">
              About
            </FooterLink>
            <FooterLink href="https://interlace.notion.site/Milestones-a90d99c6e02045a8b16971b0c16212e9">
              Roadmap
            </FooterLink>
            <FooterLink href="https://kryl7dqx6wo.typeform.com/to/BYD8iLX6">
              Careers
            </FooterLink>
          </div>
        </div>
      </div>
      <p className="w-full text-center mt-32 mb-12">
        © 2022 Exclusive Inc. All rights reserved. — Privacy Policy · Terms of
        Service
      </p>
    </LayoutItem>
  )
}

function FooterLink({
  withIcon,
  children,
  href = "/#",
}: PropsWithChildren<{
  withIcon?: boolean
  href?: string
}>) {
  return (
    <Link
      target="_blank"
      className="group flex items-center space-x-2 text-white/60 hover:text-white/80 py-2 font-light"
      href={href}
    >
      <span>{children}</span>
      {withIcon && <AnimatedLinkArrow />}
    </Link>
  )
}

export default Footer
