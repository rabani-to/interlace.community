import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

import { FaClock, FaLink } from "react-icons/fa"
import { MdEdit, MdPayments } from "react-icons/md"
import { GiPieChart } from "react-icons/gi"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"

import asset_bg from "@/assets/bg.jpg"
import ReactSelect from "@/components/forms/ReactSelect"
import TextArea from "@/components/forms/TextArea"
import Input from "@/components/forms/Input"
import SectionForm from "./SectionForm"
import Row, { RowItemIcon } from "./Row"

function ProfileCard() {
  const modalMachine = useOnOffMachine()

  function handleSubmit() {
    modalMachine.turnOff()
  }

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
          placeholder="An awesome unicorn 🦄!"
        />
        <Input
          name="portfolio"
          required
          label="Website supporting your work history and skills"
          placeholder="portfolio.xyz"
          startEnhancer="https://"
        />
        <ReactSelect
          options={[
            "1 - 8 hrs/week",
            "8 - 12 hrs/week",
            "12 - 20 hrs/week",
            "20 - 32 hrs/week",
            "32+ hrs/week",
          ]}
          required
          label="Collaboration time"
          placeholder="Select a range"
        />
        <div className="flex justify-between gap-4">
          <div className="max-w-[10rem]">
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
      <div className="w-full bg-white max-w-lg rounded-xl p-4 pb-8 font-normal">
        <section className="relative bg-black rounded-xl overflow-hidden">
          <Row
            gap="gap-1"
            className="absolute mt-4 ml-4 bg-white/20 py-2 pr-6 pl-2 rounded-full backdrop-blur-lg"
          >
            <div className="bg-violet-200 w-10 h-10 rounded-full" />
            <span className="text-white text-xl">Developer</span>
          </Row>
          <Image placeholder="blur" src={asset_bg} alt="" />
        </section>
        <section className="flex mt-8 items-center gap-2">
          <h3 className="font-bold text-4xl">Olivia</h3>
          <button
            onClick={modalMachine.turnOn}
            className="flex group gap-1 opacity-60 hover:opacity-100"
          >
            <MdEdit className="text-xl" />
            <span className="hidden group-hover:inline text-sm">Edit</span>
          </button>
        </section>
        <div className="flex flex-col items-start gap-4">
          <h4 className="text-xl font-bold">Backend Content Consultant</h4>
          <Row gap="gap-4 overflow-y-auto">
            <RowItemIcon Icon={FaClock}>$60 USD/hour</RowItemIcon>
            <RowItemIcon Icon={GiPieChart}>10-20 hrs/week</RowItemIcon>
            <RowItemIcon Icon={MdPayments}>Crypto</RowItemIcon>
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
        </div>
      </div>
    </Fragment>
  )
}

export default ProfileCard
