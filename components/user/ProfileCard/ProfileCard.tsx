import type { ProfileWithExtras, PublicProfileSection } from "@/types/shared"
import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

import { FaLink, FaTachometerAlt } from "react-icons/fa"
import { MdEdit, MdPayments } from "react-icons/md"
import { GiMagicPalm } from "react-icons/gi"
import { RiBillFill } from "react-icons/ri"

import PROFILE from "@/lib/models/profile"
import { HOURLY_RATES } from "@/lib/models/time"
import { PAYMENT_TYPES } from "@/lib/models/currency"

import useExquesiteState from "@/components/user/hook/useExquesiteState"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import profileService from "@/lib/services/profile"
import useFormattedURL from "./useFormattedURL"

import asset_bg from "@/assets/bg.jpg"
import ReactSelect from "@/components/forms/ReactSelect"
import Input from "@/components/forms/Input"
import InputNumber from "@/components/forms/InputNumber"
import Row, { RowItemIcon } from "@/components/user/Row"
import SectionFormPanel, {
  type CoreFormPanelProps,
  type DataWithSignature,
} from "@/components/user/SectionFormPanel"
import ProfileNFTImage from "./ProfileNFTImage"

type InitState = ProfileWithExtras
const INIT_STATE: InitState = {} as any
function ProfileCard({ isPublicView, profile }: PublicProfileSection) {
  const modalMachine = useOnOffMachine()
  const [state, setState] = useExquesiteState(INIT_STATE, {
    resetOnDeps: [profile?.address],
    onMutateFormatter(currentState) {
      return { ...currentState, ...profile }
    },
  })
  const portfolio = useFormattedURL(state.portfolio)

  function handleOnSubmit(signedProfile: DataWithSignature<InitState>) {
    const { data, signature } = signedProfile
    profileService.updateProfile(signature, data)
    setState(data)
  }

  return (
    <Fragment>
      <FormPanel
        initState={state}
        machine={modalMachine}
        onSubmit={handleOnSubmit}
      />
      <div className="w-full bg-white max-w-[28rem] lg:min-w-[28rem] rounded-xl p-4 pb-8 font-normal">
        <section className="relative bg-black rounded-xl overflow-hidden">
          <div className="absolute flex gap-4 justify-between z-[1] left-2 right-2 top-2 md:mt-2 md:mx-2">
            <Row
              gap="gap-2"
              className="bg-white/20 py-2 pr-6 pl-2 rounded-full backdrop-blur-lg"
            >
              <figure className="flex items-center justify-center bg-white w-10 h-10 rounded-full">
                <GiMagicPalm className="text-black text-2xl" />
              </figure>
              <span className="text-white text-lg md:text-xl">
                {state.role || "Unicorn 🦄"}
              </span>
            </Row>
            <ProfileNFTImage />
          </div>
          <figure className="min-h-[18rem]">
            <Image
              fill
              className="object-cover"
              placeholder={"blur"}
              blurDataURL={asset_bg.blurDataURL}
              src={profile?.profileImage || asset_bg}
              alt=""
            />
          </figure>
        </section>
        <section className="flex flex-col justify-end mt-6 min-h-[4rem]">
          <h3 className="font-bold lg:text-4xl">{state.name || "AnonUser"}</h3>
          {state.headline && <h4 className="lg:text-2xl">{state.headline}</h4>}
        </section>
        <section className="flex flex-col items-start gap-4 mt-4">
          <Row gap="gap-4" className="flex-wrap-reverse">
            <RowItemIcon title="User Expected Hourly Rate" Icon={MdPayments}>
              {state.hourlyRate && `$${state.hourlyRate} `}
              USD/hour
            </RowItemIcon>
            <RowItemIcon
              title="User Expected Working Time"
              Icon={FaTachometerAlt}
            >
              {state.workingTime || "N/A"}
            </RowItemIcon>
            <RowItemIcon title="User Expected Payment Type" Icon={RiBillFill}>
              {state.paymentOptions || "N/A"}
            </RowItemIcon>
          </Row>
          <Link
            className="flex group items-center gap-2"
            target={portfolio.isValid ? "_blank" : "_self"}
            href={portfolio.url}
          >
            <FaLink className="text-[#2924FF] text-2xl" />
            <span className="group-hover:underline">
              {portfolio.plainText || "No portfolio"}
            </span>
          </Link>
        </section>
        {isPublicView || (
          <section className="flex w-full -mb-2 mt-8 pt-6 border-t justify-center">
            <button
              onClick={modalMachine.turnOn}
              className="flex group gap-1 opacity-70 hover:opacity-100"
            >
              <MdEdit className="text-xl" />
              <span className="opacity-80 group-hover:opacity-100 text-sm">
                Edit Profile
              </span>
            </button>
          </section>
        )}
      </div>
    </Fragment>
  )
}

function FormPanel(props: CoreFormPanelProps<InitState>) {
  return (
    <SectionFormPanel {...props} title="Profile Overview">
      {(data) => {
        return (
          <Fragment>
            <Input
              name={PROFILE.name}
              defaultValue={data.name}
              label="Your name"
              placeholder="You can remain `anon` 🙃"
            />
            <Input
              name={PROFILE.headline}
              defaultValue={data.headline}
              label="Headline"
              placeholder="An awesome unicorn 🦄"
            />
            <ReactSelect
              name={PROFILE.workingTime}
              defaultValue={data.workingTime}
              options={HOURLY_RATES}
              required
              label="Working Time"
              placeholder="Select a range"
            />
            <Input
              required
              name={PROFILE.portfolio}
              defaultValue={data.portfolio}
              label="Website or portfolio"
              placeholder="portfolio.xyz"
              startEnhancer="https://"
            />
            <div className="flex flex-col md:flex-row justify-between gap-4 pt-1">
              <div className="md:max-w-[10rem]">
                <InputNumber
                  name={PROFILE.hourlyRate}
                  defaultValue={data.hourlyRate}
                  label="Hourly rate (in USD)"
                  placeholder="Enter number"
                  required
                />
              </div>
              <div className="flex-grow">
                <ReactSelect
                  name={PROFILE.paymentOptions}
                  defaultValue={data.paymentOptions}
                  options={PAYMENT_TYPES}
                  label="Payment type"
                  placeholder="Select payment type"
                  required
                />
              </div>
            </div>
          </Fragment>
        )
      }}
    </SectionFormPanel>
  )
}

export default ProfileCard
