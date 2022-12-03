import type { ProfileExtras, PublicProfileSection } from "@/types/shared"
import { Fragment } from "react"
import { BsFillLightningFill } from "react-icons/bs"

import { arrayIsEmptyOrFalsy } from "@/lib/arrays"
import { PROFILE_EXTRAS } from "@/lib/models/profile"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import profileService from "@/lib/services/profile"
import useExquesiteState from "@/components/user/hook/useExquesiteState"

import SectionFormPanel, {
  type CoreFormPanelProps,
  type DataWithSignature,
} from "@/components/user/SectionFormPanel"
import TextArea from "@/components/forms/TextArea"
import SectionContainer from "@/components/user/SectionContainer"
import ButtonActionEmpty from "@/components/user/ButtonActionEmpty"
import ShowHideContentWrapper from "./ShowHideContentWrapper"

/**
 * * Helper to generate `request.body = { raw: { about: { ...data }}}`
 * NOTE: This will override remote user profile content.
 */
const formatAboutContent = (data: any) => ({ about: data })

type InitState = ProfileExtras["about"]
const INIT_STATE: InitState = {
  contribution: "",
  mission: "",
  whatILookFor: "",
}

function SectionAboutMe({ isPublicView, profile }: PublicProfileSection) {
  const modalMachine = useOnOffMachine()
  const [state, setState] = useExquesiteState(INIT_STATE, {
    resetOnDeps: [profile?.address],
    onMutateFormatter(currentState) {
      return profile?.about || currentState
    },
  })

  const showEmptyState = arrayIsEmptyOrFalsy([
    state.mission,
    state.contribution,
    state.whatILookFor,
  ])

  function handleOnSubmit(signedProfile: DataWithSignature<InitState>) {
    const { data, signature } = signedProfile

    profileService.updateProfile(signature, formatAboutContent(data))
    setState(data)
  }

  if (showEmptyState && isPublicView) return null
  return (
    <Fragment>
      <FormPanel
        initState={state}
        machine={modalMachine}
        onSubmit={handleOnSubmit}
        signatureFormatter={formatAboutContent}
      />
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
          <ShowHideContentWrapper title="Mission & Vision">
            {state.mission}
          </ShowHideContentWrapper>
          <ShowHideContentWrapper title="DAO's I've contributed to">
            {state.contribution}
          </ShowHideContentWrapper>
          <ShowHideContentWrapper title="What I am looking for in a DAO">
            {state.whatILookFor}
          </ShowHideContentWrapper>
        </article>
      </SectionContainer>
    </Fragment>
  )
}

function FormPanel(props: CoreFormPanelProps<InitState>) {
  return (
    <SectionFormPanel {...props} title="Interesting thing about me">
      {(data) => {
        return (
          <Fragment>
            <TextArea
              name={PROFILE_EXTRAS.about.mission}
              label="Mission & Vision"
              defaultValue={data.mission}
              placeholder="I would like to make something awesome!!"
            />
            <TextArea
              name={PROFILE_EXTRAS.about.contribution}
              label="DAO's you've contributed to?"
              defaultValue={data.contribution}
              placeholder="I would like to make something awesome!!"
            />
            <TextArea
              name="whatILookFor"
              label="What are you looking for in a DAO?"
              defaultValue={data.whatILookFor}
              placeholder="I would like to make something awesome!!"
            />
          </Fragment>
        )
      }}
    </SectionFormPanel>
  )
}

export default SectionAboutMe
