import { type FormEvent, Fragment, useEffect, useState } from "react"
import { MdOutlineSelfImprovement } from "react-icons/md"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import TextArea from "@/components/forms/TextArea"
import PrimitiveDialog from "@/components/PrimitiveModal"
import Button from "@/components/Button"
import ProfileSection from "./ProfileSection"

function SectionHowCanI() {
  const modalMachine = useOnOffMachine()
  const [formDescription, setFormDescription] = useState<string>()
  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    setFormDescription(undefined)
  }, [modalMachine.isOff])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setDescription((current) => formDescription || current)
    modalMachine.turnOff()
  }

  return (
    <Fragment>
      <PrimitiveDialog
        background="bg-white"
        noTexture
        className="text-black"
        onClose={modalMachine.turnOff}
        show={modalMachine.isOn}
      >
        <h3>How I can contribute</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 pb-4">
          <TextArea
            label=""
            name="description"
            onChange={setFormDescription}
            required
            placeholder="I would like to make something awesome!!"
          />

          <Button className="mt-6" flavor="violet" isFormItem isFull>
            Save changes
          </Button>
        </form>
      </PrimitiveDialog>
      <ProfileSection
        onEdit={modalMachine.turnOn}
        title="How I can contribute"
        icon={<MdOutlineSelfImprovement className="text-white text-2xl" />}
      >
        <p className="text-2xl mt-4">“{description}”</p>
      </ProfileSection>
    </Fragment>
  )
}

export default SectionHowCanI
