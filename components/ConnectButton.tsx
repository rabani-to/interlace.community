import { Fragment } from "react"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import PrimitiveDialog from "./PrimitiveModal"
import Button from "./Button"

function ConnectButton() {
  const connectModal = useOnOffMachine()
  return (
    <Fragment>
      <Button
        onClick={connectModal.turnOn}
        fontSize="text-base"
        className="bg-white font-bold text-black"
      >
        Launch App
      </Button>
      <PrimitiveDialog onClose={connectModal.turnOff} show={connectModal.isOn}>
        <section className="flex flex-col space-y-4 pb-8 text-center">
          <h3 className="text-3xl mb-5 mt-8">How would you like to connect?</h3>
          <Button
            isLink
            target="_blank"
            href="/onboarding"
            borderRadius="rounded-xl"
            className="bg-blue-300 py-5 justify-center font-bold text-black"
          >
            Connect as a Contributor
          </Button>
          <Button
            isLink
            target="_blank"
            href="/onboarding"
            borderRadius="rounded-xl"
            className="bg-white py-5 justify-center font-bold text-black"
          >
            Connect as a DAO
          </Button>
        </section>
      </PrimitiveDialog>
    </Fragment>
  )
}

export default ConnectButton
