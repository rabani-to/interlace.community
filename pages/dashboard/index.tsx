import Image from "next/image"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import PrimitiveDialog from "@/components/PrimitiveModal"
import SeoTags from "@/components/SeoTags"
import Button from "@/components/Button"
import TopNavigation from "@/components/TopNavigation"
import ModalShareProfile from "@/components/ModalShareProfile"
import { LayoutItem } from "@/components/layouts/GradientSection"
import Row, { RowItemIcon } from "@/components/user/Row"
import Footer from "@/components/Footer"

import SectionExpertise from "@/components/user/SectionExpertise"
import SectionHowCanI from "@/components/user/SectionHowCanI"
import SectionAboutMe from "@/components/user/SectionAboutMe"

import { FaClock, FaLink, FaShareSquare } from "react-icons/fa"
import { MdPayments } from "react-icons/md"
import { GiPieChart } from "react-icons/gi"
import asset_bg from "@/assets/bg.jpg"

export default function Dashboard() {
  const welcomeModal = useOnOffMachine(true)
  const shareProfileModal = useOnOffMachine(false)
  return (
    <main data-type="texturized" className="bg-darker">
      <SeoTags title="InterLace | Dashboard" />
      <ModalShareProfile
        show={shareProfileModal.isOn}
        onClose={shareProfileModal.turnOff}
      />
      <PrimitiveDialog onClose={welcomeModal.turnOff} show={welcomeModal.isOn}>
        <section className="flex flex-col space-y-4 pb-8 text-center">
          <h3 className="mt-8">Web3 profile Created!</h3>
          <p className="text-xl pb-6 max-w-sm mx-auto leading-relaxed">
            Below are some things you can do while we connect you with a DAO
          </p>
          <Button
            borderRadius="rounded-xl"
            className="bg-blue-300 py-5 justify-center font-bold text-black"
          >
            View and Edit Profile
          </Button>
          <Button
            borderRadius="rounded-xl"
            className="bg-white py-5 justify-center font-bold text-black"
          >
            Share Profile
          </Button>
        </section>
      </PrimitiveDialog>
      <section className="bg-gradient-to-b z-10 from-darker to-white/[0.04] py-6 top-0 backdrop-blur-sm sticky">
        <LayoutItem>
          <TopNavigation isHeadless withWallet />
        </LayoutItem>
      </section>
      <LayoutItem>
        <section className="flex gap-8 items-center lg:items-end justify-between border-b mb-12 py-12">
          <div>
            <h3 className="font-bold">Your Web3 Profile</h3>
            <p className="text-xl text-gray-400">
              Manage and share your Web3 contrubutions
            </p>
          </div>
          <button
            title="Share your profile"
            className="group"
            onClick={shareProfileModal.turnOn}
          >
            <FaShareSquare className="text-3xl group-hover:scale-105 transition-transform duration-75" />
          </button>
        </section>
        <section className="flex flex-col lg:flex-row text-black gap-12">
          <div className="w-full bg-white max-w-lg rounded-xl p-4 pb-8 font-normal">
            <div className="relative bg-black rounded-xl overflow-hidden">
              <Row
                gap="gap-1"
                className="absolute mt-4 ml-4 bg-white/20 py-2 pr-6 pl-2 rounded-full backdrop-blur-lg"
              >
                <div className="bg-violet-200 w-10 h-10 rounded-full" />
                <span className="text-white text-xl">Developer</span>
              </Row>
              <Image placeholder="blur" src={asset_bg} alt="" />
            </div>
            <h3 className="font-bold mt-8 text-4xl">Olivia</h3>
            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-bold">Backend Content Consultant</h4>
              <Row gap="gap-4 overflow-y-auto">
                <RowItemIcon Icon={FaClock}>$60 USD/hour</RowItemIcon>
                <RowItemIcon Icon={GiPieChart}>10-20 hrs/week</RowItemIcon>
                <RowItemIcon Icon={MdPayments}>Crypto</RowItemIcon>
              </Row>
              <Row>
                <FaLink className="text-[#2924FF] text-2xl" />
                <span>https://github.com/gyan0890</span>
              </Row>
            </div>
          </div>
          <div className="flex flex-col gap-12 flex-grow text-white">
            <SectionHowCanI />
            <SectionExpertise />
            <SectionAboutMe />
          </div>
        </section>
      </LayoutItem>
      <Footer className="mt-32 lg:mt-4" />
    </main>
  )
}
