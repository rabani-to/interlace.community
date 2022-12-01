import { useRouter } from "next/router"
import SectionExpertise from "@/components/user/SectionExpertise"
import SectionHowCanIContribute from "@/components/user/SectionHowCanIContribute"
import SectionAboutMe from "@/components/user/SectionAboutMe"
import ProfileCard from "@/components/user/ProfileCard"

import useRemoteProfileData from "@/lib/hooks/useRemoteProfileData"
import SeoTags from "@/components/SeoTags"
import TopNavigation from "@/components/TopNavigation"
import { LayoutItem } from "@/components/layouts/GradientSection"
import Footer from "@/components/Footer"

export default function ProfilePage() {
  const router = useRouter()
  const shortIdOrAddress = router.query.id as string
  const profileData = useRemoteProfileData(shortIdOrAddress)
  return (
    <main data-type="texturized" className="bg-darker">
      <SeoTags title="InterLace | Dashboard" />
      <section className="bg-white/[0.03] py-6 shadow-sm">
        <LayoutItem>
          <TopNavigation isHeadless />
        </LayoutItem>
      </section>
      {profileData.isLoading ? (
        <LoadingState />
      ) : profileData.isOk ? (
        <LayoutItem>
          <section className="flex items-start mt-8 lg:mt-20 flex-col lg:flex-row text-black gap-12">
            <div className="flex-grow" />
            <ProfileCard profile={profileData.data} isPublicView />
            <div className="flex lg:mt-8 flex-col gap-12 flex-grow text-white">
              <SectionHowCanIContribute
                profile={profileData.data}
                isPublicView
              />
              <SectionExpertise profile={profileData.data} isPublicView />
              <SectionAboutMe profile={profileData.data} isPublicView />
            </div>
          </section>
        </LayoutItem>
      ) : (
        <ErrorState />
      )}
      <Footer className="mt-24 lg:mt-32" />
    </main>
  )
}

const StateContainer = ({ children }: { children: any }) => (
  <section className="min-h-[calc(40vh+6rem)] flex flex-col gap-2 items-center justify-center">
    {children}
  </section>
)

function LoadingState() {
  return (
    <StateContainer>
      <svg
        className="animate-spin h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="opacity-30">Wait a sec...</span>
    </StateContainer>
  )
}

function ErrorState() {
  return (
    <StateContainer>
      <h2>Oh-No!</h2>
      <span className="opacity-30">We couldn{"'"}t find that user...</span>
    </StateContainer>
  )
}
