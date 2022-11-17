import { Fragment } from "react"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import PrimitiveDialog from "@/components/PrimitiveModal"
import SeoTags from "@/components/SeoTags"
import Button from "@/components/Button"

export default function Dashboard() {
  const welcomeModal = useOnOffMachine(true)
  return (
    <Fragment>
      <SeoTags title="InterLace | Dashboard" />
      <main className="flex items-center justify-center min-h-screen text-zinc-800 font-normal">
        <PrimitiveDialog
          onClose={welcomeModal.turnOff}
          show={welcomeModal.isOn}
        >
          <section className="flex flex-col space-y-4 pb-8 text-center">
            <h3 className="mt-8">Web3 profile Created!</h3>
            <p className="text-xl pb-6 max-w-sm mx-auto leading-relaxed">
              Below are some things you can do while we connect you with a DAO
            </p>
            <Button
              borderRadius="rounded-xl"
              className="bg-blue-300 py-5 justify-center font-bold text-black"
            >
              View and Edit Profile
            </Button>
            <Button
              borderRadius="rounded-xl"
              className="bg-white py-5 justify-center font-bold text-black"
            >
              Share Profile
            </Button>
          </section>
        </PrimitiveDialog>
        <h2 className="text-white font-bold">Here will be unicorns</h2>
      </main>
    </Fragment>
  )
}
