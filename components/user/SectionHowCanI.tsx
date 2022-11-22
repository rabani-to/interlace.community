import { Fragment, useEffect, useState } from "react"
import { MdOutlineSelfImprovement } from "react-icons/md"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import TextArea from "@/components/forms/TextArea"
import ProfileSection from "./ProfileSection"
import ButtonActionEmpty from "./ButtonActionEmpty"
import SectionForm from "./SectionForm"

function SectionHowCanI() {
  const modalMachine = useOnOffMachine()
  const [formDescription, setFormDescription] = useState<string>()
  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    setFormDescription(undefined)
  }, [modalMachine.isOff])

  function handleSubmit() {
    setDescription((current) => formDescription || current)
    modalMachine.turnOff()
  }

  return (
    <Fragment>
      <SectionForm
        show={modalMachine.isOn}
        onClose={modalMachine.turnOff}
        title="How I can contribute"
        onSubmit={handleSubmit}
      >
        <TextArea
          label=""
          name="description"
          onChange={setFormDescription}
          required
          placeholder="I would like to make something awesome!!"
        />
      </SectionForm>
      <ProfileSection
        onEdit={modalMachine.turnOn}
        title="How I can contribute"
        icon={<MdOutlineSelfImprovement className="text-white text-2xl" />}
      >
        <section className="pt-4">
          {description.length === 0 ? (
            <ButtonActionEmpty className="mt-2" onClick={modalMachine.turnOn}>
              Write something
            </ButtonActionEmpty>
          ) : (
            <p className="text-2xl">“{description}”</p>
          )}
        </section>
      </ProfileSection>
    </Fragment>
  )
}

export default SectionHowCanI