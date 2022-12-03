import type { PublicProfileSection, Profile } from "@/types/shared"
import type { DataWithSignature } from "./SectionFormPanel"
import { Fragment } from "react"
import { MdOutlineSelfImprovement } from "react-icons/md"

import { PROFILE_EXPERIENCE } from "@/lib/models/profile"
import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import profileService from "@/lib/services/profile"
import TextArea from "@/components/forms/TextArea"
import SectionContainer from "./SectionContainer"
import ButtonActionEmpty from "./ButtonActionEmpty"
import SectionForm from "./SectionForm"
import useExquesiteState from "./hook/useExquesiteState"

type InitState = Pick<Profile, "description">
const INIT_STATE: InitState = {
  description: "",
}

function SectionHowCanIContribute({
  isPublicView,
  profile,
}: PublicProfileSection) {
  const modalMachine = useOnOffMachine()
  const [{ description }, setState] = useExquesiteState(INIT_STATE, {
    resetOnDeps: [profile?.address],
    onMutateFormatter({ description }) {
      return {
        description: profile?.description || description,
      }
    },
  })

  function handleOnSubmit(signedProfile: DataWithSignature<InitState>) {
    const { data, signature } = signedProfile

    profileService.updateProfile(signature, data)
    modalMachine.turnOff()
    setState(data)
  }

  const showEmptyState = description.length === 0
  if (showEmptyState && isPublicView) return null
  return (
    <Fragment>
      <SectionForm
        show={modalMachine.isOn}
        onClose={modalMachine.turnOff}
        title="How I can contribute"
        onSubmit={handleOnSubmit}
      >
        <TextArea
          label=""
          name={PROFILE_EXPERIENCE.description}
          defaultValue={description}
          placeholder="Please describe how you can best contribute to a web3 project in 1 sentence."
          required
        />
      </SectionForm>
      <SectionContainer
        isPublicView={isPublicView}
        onEdit={modalMachine.turnOn}
        title="How I can contribute"
        icon={<MdOutlineSelfImprovement className="text-white text-2xl" />}
      >
        <section className="pt-4">
          {showEmptyState ? (
            <ButtonActionEmpty className="mt-2" onClick={modalMachine.turnOn}>
              Add description
            </ButtonActionEmpty>
          ) : (
            <p className="text-2xl">“{description}”</p>
          )}
        </section>
      </SectionContainer>
    </Fragment>
  )
}

export default SectionHowCanIContribute
