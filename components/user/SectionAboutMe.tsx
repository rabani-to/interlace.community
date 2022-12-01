import type { PublicProfileSection } from "@/types/shared"
import { Fragment, useEffect, useState } from "react"
import { BsFillLightningFill } from "react-icons/bs"

import { arrayIsEmptyOrFalsy } from "@/lib/arrays"
import useOnOffMachine, { OnOffMachine } from "@/lib/hooks/useOnOffMachine"

import TextArea from "@/components/forms/TextArea"
import SectionContainer from "./SectionContainer"
import SectionForm from "./SectionForm"
import ButtonActionEmpty from "./ButtonActionEmpty"

const INIT_STATE = {
  missionVision: "",
  myContribution: "",
  whatILookFor: "",
}
type InitState = typeof INIT_STATE
function SectionAboutMe({ isPublicView, profile }: PublicProfileSection) {
  const modalMachine = useOnOffMachine()
  const [state, setState] = useState(INIT_STATE)

  const showEmptyState = arrayIsEmptyOrFalsy([
    state.missionVision,
    state.myContribution,
    state.whatILookFor,
  ])

  // useEffect(() => {}, [profile?.address])
  if (showEmptyState && isPublicView) return null
  return (
    <Fragment>
      <ModalPane initState={state} onSubmit={setState} machine={modalMachine} />
      <SectionContainer
        isPublicView={isPublicView}
        onEdit={modalMachine.turnOn}
        title="Interesting thing about me"
        icon={<BsFillLightningFill className="text-white text-xl" />}
      >
        {showEmptyState && (
          <div className="flex flex-wrap gap-4 mt-6">
            <ButtonActionEmpty onClick={modalMachine.turnOn}>
              Add Mission
            </ButtonActionEmpty>
            <ButtonActionEmpty onClick={modalMachine.turnOn}>
              Web3 projetcs you{"'"}ve contributed to?
            </ButtonActionEmpty>
            <ButtonActionEmpty onClick={modalMachine.turnOn}>
              What are you looking for in a Web3 project?
            </ButtonActionEmpty>
          </div>
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
      </SectionContainer>
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
