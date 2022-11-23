import Image from "next/image"

import { FiCopy } from "react-icons/fi"
import { FaInstagram, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa"
import PrimitiveDialog, { type DialogProps } from "@/components/PrimitiveModal"
import Input from "@/components/forms/Input"

import asset_bg from "@/assets/share-image.png"
import styles from "./ModalShareProfile.module.css"

function ModalShareProfile(props: DialogProps) {
  return (
    <PrimitiveDialog
      maxWidth="max-w-3xl"
      className={`${styles.withSvgBackground} overflow-hidden`}
      {...props}
    >
      <section className="flex flex-col md:flex-row w-full">
        <h3 className="text-center p-6 mb-12 md:mb-0 md:pt-16 md:pr-0 leading-relaxed">
          Share your Web3 profile with your social community
        </h3>
        <Image
          className="hidden md:block"
          placeholder="blur"
          src={asset_bg}
          alt=""
        />
      </section>
      <section className="flex -mt-2 text-3xl text-white/70 items-center justify-center gap-4">
        <button className="hover:text-white">
          <FaLinkedin />
        </button>
        <button className="hover:text-white">
          <FaInstagram />
        </button>
        <button className="hover:text-white">
          <FaTwitter />
        </button>
        <button className="hover:text-white">
          <FaTelegram />
        </button>
      </section>
      <section className="max-w-lg mx-auto mt-4 mb-8">
        <Input
          className="bg-white"
          readOnly
          placeholder="https://interlace.community/profile/02ewo"
          labelTextColor="text-white"
          endEnhancer={
            <button className="text-zinc-600 group px-2 flex space-x-1 items-center font-bold">
              <FiCopy className="text-xl group-hover:scale-105 duration-75" />
              <span>Copy</span>
            </button>
          }
          label="Or copy link"
        />
      </section>
    </PrimitiveDialog>
  )
}

export default ModalShareProfile
