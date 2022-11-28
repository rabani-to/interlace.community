import { Fragment } from "react"

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
      <PrimitiveDialog
        items="items-center lg:items-start"
        justify="justify-center lg:justify-end"
        className="lg:max-w-7xl lg:px-8 lg:mt-16 mx-auto"
        onClose={connectModal.turnOff}
        show={connectModal.isOn}
      >
        <section className="flex flex-col space-y-4 pb-8 text-center">
          <h3 className="mb-5 mt-8">How would you like to connect?</h3>
          <Button
            isLink
            href="/dashboard"
            data-type="texturized"
            target="_blank"
            borderRadius="rounded-xl"
            className="bg-blue-300 py-5 justify-center font-bold text-black"
          >
            Connect as a Contributor
          </Button>
          <Button
            isLink
            target="_blank"
            href="https://kryl7dqx6wo.typeform.com/to/Srgs9NCE"
            borderRadius="rounded-xl"
            className="bg-white py-5 justify-center font-bold text-black"
          >
            Connect as a dORG
          </Button>
        </section>
      </PrimitiveDialog>
    </Fragment>
  )
}

export default ConnectButton
