import SectionExpertise from "@/components/user/SectionExpertise"
import SectionHowCanIContribute from "@/components/user/SectionHowCanIContribute"
import SectionAboutMe from "@/components/user/SectionAboutMe"
import ProfileCard from "@/components/user/ProfileCard"

import SeoTags from "@/components/SeoTags"
import TopNavigation from "@/components/TopNavigation"
import { LayoutItem } from "@/components/layouts/GradientSection"
import Footer from "@/components/Footer"

export default function ProfilePage() {
  return (
    <main data-type="texturized" className="bg-darker">
      <SeoTags title="InterLace | Dashboard" />
      <section className="bg-white/[0.03] py-6 shadow-sm">
        <LayoutItem>
          <TopNavigation isHeadless />
        </LayoutItem>
      </section>
      <LayoutItem>
        <section className="flex mt-8 lg:mt-20 flex-col lg:flex-row text-black gap-12">
          <div className="flex-grow" />
          <ProfileCard isPublicView />
          <div className="flex lg:mt-8 flex-col gap-12 flex-grow text-white">
            <SectionHowCanIContribute isPublicView />
            <SectionExpertise isPublicView />
            <SectionAboutMe isPublicView />
          </div>
        </section>
      </LayoutItem>
      <Footer className="mt-24 lg:mt-32" />
    </main>
  )
}
