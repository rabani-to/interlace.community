import type { ProfileWithExtras, PublicProfileSection } from "@/types/shared"
import { Fragment, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { FaLink, FaTachometerAlt } from "react-icons/fa"
import { MdEdit, MdPayments } from "react-icons/md"
import { RiBillFill } from "react-icons/ri"

import useOnOffMachine, { OnOffMachine } from "@/lib/hooks/useOnOffMachine"
import useFormattedURL from "./useFormattedURL"

import asset_bg from "@/assets/bg.jpg"
import ReactSelect from "@/components/forms/ReactSelect"
import Input from "@/components/forms/Input"
import Row, { RowItemIcon } from "@/components/user/Row"
import SectionForm from "@/components/user/SectionForm"

const INIT_STATE: ProfileWithExtras = {} as any
function ProfileCard({ isPublicView, profile }: PublicProfileSection) {
  const modalMachine = useOnOffMachine()
  const [state, setState] = useState(INIT_STATE)
  const portfolio = useFormattedURL(state.portfolio)

  useEffect(() => {
    setState((state) => ({ ...state, ...profile }))
  }, [profile?.address])

  return (
    <Fragment>
      <ModalPane machine={modalMachine} onSubmit={setState} initState={state} />
      <div className="w-full bg-white max-w-[28rem] lg:min-w-[28rem] rounded-xl p-4 pb-8 font-normal">
        <section className="relative bg-black rounded-xl overflow-hidden">
          <Row
            gap="gap-1"
            className="absolute z-[1] ml-2 mt-2 md:mt-4 md:ml-4 bg-white/20 py-2 pr-6 pl-2 rounded-full backdrop-blur-lg"
          >
            <div className="bg-violet-200 w-10 h-10 rounded-full" />
            <span className="text-white text-lg md:text-xl">
              {state.role || "Unicorn 🦄"}
            </span>
          </Row>
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

function ModalPane({
  machine,
  onSubmit,
  initState,
}: {
  machine: OnOffMachine
  initState: ProfileWithExtras
  onSubmit(state: ProfileWithExtras): void
}) {
  const [state, setState] = useState(initState)
  const asyncSetState = (newState: Partial<ProfileWithExtras>) =>
    setState((prevState) => ({ ...prevState, ...newState }))

  function handleSubmit() {
    machine.turnOff()
    onSubmit(state)
  }

  useEffect(() => {
    setState(initState)
  }, [machine.isOff, initState])

  return (
    <SectionForm
      onSubmit={handleSubmit}
      title="Profile Overview"
      onClose={machine.turnOff}
      show={machine.isOn}
    >
      <Input
        defaultValue={state.name}
        onChange={(name) =>
          asyncSetState({
            name,
          })
        }
        label="Your name"
        placeholder="You can remain `anon` 🙃"
      />
      <Input
        defaultValue={state.headline}
        onChange={(headline) =>
          asyncSetState({
            headline,
          })
        }
        label="Headline"
        placeholder="An awesome unicorn 🦄"
      />
      <ReactSelect
        defaultValue={state.workingTime}
        onSelect={([{ value: workingTime }]) =>
          asyncSetState({
            workingTime,
          })
        }
        name="workingTime"
        options={[
          "1 - 8 hrs/week",
          "8 - 12 hrs/week",
          "12 - 25 hrs/week",
          "25 - 32 hrs/week",
          "32+ hrs/week",
        ]}
        required
        label="Working Time"
        placeholder="Select a range"
      />
      <Input
        defaultValue={state.portfolio}
        onChange={(portfolio) =>
          asyncSetState({
            portfolio,
          })
        }
        name="portfolio"
        required
        label="Website or portfolio"
        placeholder="portfolio.xyz"
        startEnhancer="https://"
      />
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-1">
        <div className="md:max-w-[10rem]">
          <Input
            defaultValue={state.hourlyRate}
            onChange={(hourlyRate) =>
              asyncSetState({
                hourlyRate,
              })
            }
            required
            name="hourlyRate"
            label="Hourly rate (in USD)"
            type="number"
            step=".1"
            min="1"
            placeholder="Enter number"
          />
        </div>
        <div className="flex-grow">
          <ReactSelect
            defaultValue={state.paymentOptions}
            onSelect={([{ value: paymentOptions }]) =>
              asyncSetState({
                paymentOptions,
              })
            }
            name="paymentOptions"
            options={["Crypto", "FIAT"]}
            required
            label="Payment type"
            placeholder="Select payment type"
          />
        </div>
      </div>
    </SectionForm>
  )
}

export default ProfileCard
