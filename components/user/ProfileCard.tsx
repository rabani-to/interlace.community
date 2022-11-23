import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

import { FaLink, FaTachometerAlt } from "react-icons/fa"
import { MdEdit, MdPayments } from "react-icons/md"
import { RiBillFill } from "react-icons/ri"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import useHybridAccount from "@/lib/hooks/useHybridAccount"
import { beautifyAddress } from "@/lib/helpers"

import asset_bg from "@/assets/bg.jpg"
import ReactSelect from "@/components/forms/ReactSelect"
import Input from "@/components/forms/Input"
import SectionForm from "./SectionForm"
import Row, { RowItemIcon } from "./Row"

function ProfileCard() {
  const { address } = useHybridAccount()
  const modalMachine = useOnOffMachine()

  function handleSubmit() {
    modalMachine.turnOff()
  }

  const beautyAddress = beautifyAddress(address)

  return (
    <Fragment>
      <SectionForm
        onSubmit={handleSubmit}
        title="Profile Overview"
        onClose={modalMachine.turnOff}
        show={modalMachine.isOn}
      >
        <Input
          label="Your name"
          name="name"
          placeholder="You can remain `anon` 🙃"
        />
        <Input
          label="Headline"
          name="name"
          required
          placeholder="An awesome unicorn 🦄"
        />
        <ReactSelect
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
          name="portfolio"
          required
          label="Website or portfolio"
          placeholder="portfolio.xyz"
          startEnhancer="https://"
        />
        <div className="flex flex-col md:flex-row justify-between gap-4 pt-1">
          <div className="md:max-w-[10rem]">
            <Input
              required
              label="Hourly rate (in USD)"
              type="number"
              step=".1"
              min="1"
              placeholder="Enter number"
            />
          </div>
          <div className="flex-grow">
            <ReactSelect
              options={["Crypto", "FIAT"]}
              required
              label="Payment type"
              placeholder="Select payment type"
            />
          </div>
        </div>
      </SectionForm>
      <div className="w-full bg-white max-w-[30rem] rounded-xl p-4 pb-8 font-normal">
        <section className="relative bg-black rounded-xl overflow-hidden">
          <Row
            gap="gap-1"
            className="absolute ml-2 mt-2 md:mt-4 md:ml-4 bg-white/20 py-2 pr-6 pl-2 rounded-full backdrop-blur-lg"
          >
            <div className="bg-violet-200 w-10 h-10 rounded-full" />
            <span className="text-white text-lg md:text-xl">Developer</span>
          </Row>
          <Image placeholder="blur" src={asset_bg} alt="" />
        </section>
        <h3 className="font-bold lg:text-4xl mt-6">
          Anon / {beautyAddress || "Person"}
        </h3>
        <section className="flex flex-col items-start gap-4">
          <h4 className="lg:text-xl font-bold">Backend Content Consultant</h4>
          <Row gap="gap-4" className="flex-wrap-reverse">
            <RowItemIcon Icon={MdPayments}>$60 USD/hour</RowItemIcon>
            <RowItemIcon Icon={FaTachometerAlt}>10-20 hrs/week</RowItemIcon>
            <RowItemIcon Icon={RiBillFill}>Crypto</RowItemIcon>
          </Row>
          <Link
            className="flex group items-center gap-2"
            target="_blank"
            href="https://github.com/gyan0890"
          >
            <FaLink className="text-[#2924FF] text-2xl" />
            <span className="group-hover:underline">
              https://github.com/gyan0890
            </span>
          </Link>
        </section>
        <section className="flex w-full -mb-2 mt-6 pt-6 border-t justify-center">
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
      </div>
    </Fragment>
  )
}

export default ProfileCard
