import { Fragment } from "react"
import { useConnectModal } from "@rainbow-me/rainbowkit"

import { noOp } from "@/lib/helpers"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import PrimitiveDialog from "./PrimitiveModal"
import Button from "./Button"

function ConnectButton() {
  const { openConnectModal = noOp } = useConnectModal()
  const connectModal = useOnOffMachine()
  function handleWalletConnect() {
    openConnectModal()
  }
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
          <h3 className="mb-5 mt-8">How would you like to connect?</h3>
          <Button
            onClick={handleWalletConnect}
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
            Connect as a DAO
          </Button>
        </section>
      </PrimitiveDialog>
    </Fragment>
  )
}

export default ConnectButton
