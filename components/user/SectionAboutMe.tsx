import { Fragment, useEffect, useState } from "react"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import { BsFillLightningFill } from "react-icons/bs"

import TextArea from "@/components/forms/TextArea"
import ProfileSection from "./ProfileSection"
import SectionForm from "./SectionForm"

function SectionAboutMe() {
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
        title="Interesting thing about me"
        onSubmit={handleSubmit}
      >
        <TextArea
          label="Mission & Vision"
          name="description"
          onChange={setFormDescription}
          required
          placeholder="I would like to make something awesome!!"
        />
        <TextArea
          label="DAO's you've contributed to?"
          name="description"
          onChange={setFormDescription}
          required
          placeholder="I would like to make something awesome!!"
        />
        <TextArea
          label="What are you looking for in a DAO?"
          name="description"
          onChange={setFormDescription}
          required
          placeholder="I would like to make something awesome!!"
        />
      </SectionForm>

      <ProfileSection
        onEdit={modalMachine.turnOn}
        title="Interesting thing about me"
        icon={<BsFillLightningFill className="text-white text-xl" />}
      >
        <article className="text-xl">
          <header className="mt-4">Mission</header>
          <p className="text-gray-400">
            I formulate product strategy and validation for software products as
            well as planning out prototypes, roadmaps and feature development.
          </p>
        </article>
      </ProfileSection>
    </Fragment>
  )
}

export default SectionAboutMe
