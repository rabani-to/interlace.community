import type { PropsWithChildren } from "react"
import Image, { type StaticImageData } from "next/image"

import asset_a from "@/assets/profiles/a.png"
import asset_b from "@/assets/profiles/b.png"
import asset_c from "@/assets/profiles/c.png"
import asset_d from "@/assets/profiles/d.png"
import asset_e from "@/assets/profiles/e.png"
import asset_f from "@/assets/profiles/f.png"
import asset_g from "@/assets/profiles/g.png"
import asset_h from "@/assets/profiles/h.png"
import asset_i from "@/assets/profiles/i.png"
import asset_j from "@/assets/profiles/j.png"
import asset_k from "@/assets/profiles/k.png"

function Contribution({
  children,
  imageSrc,
}: PropsWithChildren<{
  imageSrc: StaticImageData
}>) {
  return (
    <div className="flex items-center space-x-3 bg-black/60 py-4 pl-4 pr-6 font-bold text-xl rounded-full">
      <Image
        placeholder="blur"
        className="w-10 h-10 overflow-hidden rounded-full"
        alt=""
        src={imageSrc}
      />
      <span>{children}</span>
    </div>
  )
}

function Contributors() {
  return (
    <div className="flex gap-6 flex-wrap justify-center items-center">
      <Contribution imageSrc={asset_a}>Legal</Contribution>
      <Contribution imageSrc={asset_b}>Design</Contribution>
      <Contribution imageSrc={asset_c}>Development</Contribution>
      <Contribution imageSrc={asset_d}>Art</Contribution>
      <Contribution imageSrc={asset_e}>Tokenomics</Contribution>
      <Contribution imageSrc={asset_f}>Sales</Contribution>

      <Contribution imageSrc={asset_g}>Analyst</Contribution>
      <Contribution imageSrc={asset_h}>Community</Contribution>
      <Contribution imageSrc={asset_i}>Marketing</Contribution>
      <Contribution imageSrc={asset_j}>Operations</Contribution>
      <Contribution imageSrc={asset_k}>Writing</Contribution>
      <Contribution imageSrc={asset_b}>Product</Contribution>
    </div>
  )
}

export default Contributors
