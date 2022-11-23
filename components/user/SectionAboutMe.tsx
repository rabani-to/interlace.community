import { Fragment, useEffect, useState } from "react"
import { BsFillLightningFill } from "react-icons/bs"

import { arrayIsEmptyOrFalsy } from "@/lib/arrays"
import useOnOffMachine, { OnOffMachine } from "@/lib/hooks/useOnOffMachine"

import TextArea from "@/components/forms/TextArea"
import ProfileSection from "./ProfileSection"
import SectionForm from "./SectionForm"
import ButtonActionEmpty from "./ButtonActionEmpty"

const INIT_STATE = {
  missionVision: "",
  myContribution: "",
  whatILookFor: "",
}
type InitState = typeof INIT_STATE
function SectionAboutMe() {
  const modalMachine = useOnOffMachine()
  const [state, setState] = useState(INIT_STATE)

  const showEmptyState = arrayIsEmptyOrFalsy([
    state.missionVision,
    state.myContribution,
    state.whatILookFor,
  ])

  return (
    <Fragment>
      <ModalPane initState={state} onSubmit={setState} machine={modalMachine} />
      <ProfileSection
        onEdit={modalMachine.turnOn}
        title="Interesting thing about me"
        icon={<BsFillLightningFill className="text-white text-xl" />}
      >
        {showEmptyState && (
          <ButtonActionEmpty className="mt-6" onClick={modalMachine.turnOn}>
            Add Mission
          </ButtonActionEmpty>
        )}
        <article className="text-xl">
          <ShowHideContent title="Mission & Vision">
            {state.missionVision}
          </ShowHideContent>
          <ShowHideContent title="DAO's I've contributed to">
            {state.myContribution}
          </ShowHideContent>
          <ShowHideContent title="What I am looking for in a DAO">
            {state.whatILookFor}
          </ShowHideContent>
        </article>
      </ProfileSection>
    </Fragment>
  )
}

function ModalPane({
  machine,
  onSubmit,
  initState,
}: {
  machine: OnOffMachine
  initState: InitState
  onSubmit(state: InitState): void
}) {
  const [state, setState] = useState(initState)
  const asyncSetState = (newState: Partial<InitState>) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  function handleSubmit() {
    machine.turnOff()
    onSubmit(state)
  }

  useEffect(() => {
    setState(initState)
  }, [machine.isOff, initState])

  return (
    <SectionForm
      show={machine.isOn}
      onClose={machine.turnOff}
      title="Interesting thing about me"
      onSubmit={handleSubmit}
    >
      <TextArea
        label="Mission & Vision"
        defaultValue={state.missionVision}
        placeholder="I would like to make something awesome!!"
        onChange={(missionVision) =>
          asyncSetState({
            missionVision,
          })
        }
      />
      <TextArea
        label="DAO's you've contributed to?"
        defaultValue={state.myContribution}
        placeholder="I would like to make something awesome!!"
        onChange={(myContribution) =>
          asyncSetState({
            myContribution,
          })
        }
      />
      <TextArea
        label="What are you looking for in a DAO?"
        defaultValue={state.whatILookFor}
        placeholder="I would like to make something awesome!!"
        onChange={(whatILookFor) =>
          asyncSetState({
            whatILookFor,
          })
        }
      />
    </SectionForm>
  )
}

function ShowHideContent({
  children,
  title,
}: {
  title: string
  children: any
}) {
  if (children !== "") {
    return (
      <Fragment>
        <header className="mt-4">{title}</header>
        <p className="text-gray-400">{children}</p>
      </Fragment>
    )
  }
  return null
}

export default SectionAboutMe
