import { useEffect } from "react"
import { useRouter } from "next/router"
import { FaShareSquare } from "react-icons/fa"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import useHybridAccount from "@/lib/hooks/useHybridAccount"
import useRemoteProfileData from "@/lib/hooks/useRemoteProfileData"
import PrimitiveDialog from "@/components/PrimitiveModal"
import SectionExpertise from "@/components/user/SectionExpertise"
import SectionHowCanIContribute from "@/components/user/SectionHowCanIContribute"
import SectionAboutMe from "@/components/user/SectionAboutMe"
import ProfileCard from "@/components/user/ProfileCard"

import SeoTags from "@/components/SeoTags"
import Button from "@/components/Button"
import TopNavigation from "@/components/TopNavigation"
import ModalShareProfile from "@/components/ModalShareProfile"
import { LayoutItem } from "@/components/layouts/GradientSection"
import Footer from "@/components/Footer"

export default function Dashboard() {
  const { address } = useHybridAccount()
  const { query } = useRouter()
  const welcomeModal = useOnOffMachine(false)
  const shareProfileModal = useOnOffMachine(false)
  const profileData = useRemoteProfileData(address)

  useEffect(() => {
    if (query.showWelcome) {
      welcomeModal.turnOn()
    }
  }, [query.showWelcome])

  return (
    <main data-type="texturized" className="bg-darker">
      <SeoTags title="InterLace | Dashboard" />
      <ModalShareProfile
        shortId={profileData.data?.shortId}
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
            onClick={welcomeModal.turnOff}
            borderRadius="rounded-xl"
            className="bg-blue-300 py-5 justify-center font-bold text-black"
          >
            View Profile
          </Button>
          <Button
            onClick={shareProfileModal.turnOn}
            borderRadius="rounded-xl"
            className="bg-white py-5 justify-center font-bold text-black"
          >
            Share Profile
          </Button>
        </section>
      </PrimitiveDialog>
      <section className="bg-white/[0.03] py-6 shadow-sm">
        <LayoutItem>
          <TopNavigation isHeadless withWallet />
        </LayoutItem>
      </section>
      <LayoutItem>
        <section className="border-b mb-12 py-12">
          <h3 className="font-bold">Your Web3 Profile</h3>
          <div className="flex justify-between">
            <p className="text-xl text-gray-400">
              Manage and share your Web3 contrubutions
            </p>
            <button
              title="Share your profile"
              className="group pl-5"
              onClick={shareProfileModal.turnOn}
            >
              <FaShareSquare className="text-3xl group-hover:scale-105 transition-transform duration-75" />
            </button>
          </div>
        </section>
        <section className="flex items-start flex-col lg:flex-row text-black gap-12">
          <ProfileCard profile={profileData.data} />
          <div className="flex flex-col gap-12 flex-grow text-white">
            <SectionHowCanIContribute profile={profileData.data} />
            <SectionExpertise profile={profileData.data} />
            <SectionAboutMe profile={profileData.data} />
          </div>
        </section>
      </LayoutItem>
      <Footer className="mt-32 lg:mt-4" />
    </main>
  )
}
