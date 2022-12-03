import type { Experience, PublicProfileSection } from "@/types/shared"
import type { DataWithSignature } from "./SectionFormPanel"
import { Fragment, type PropsWithChildren } from "react"
import { FaDiceD6 } from "react-icons/fa"

import ALL_ROLES from "@/lib/models/roles"
import { PROFILE_EXPERIENCE } from "@/lib/models/profile"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import ReactSelect from "@/components/forms/ReactSelect"
import ItemWithDescrition from "@/components/forms/ItemWithDescription"
import SectionContainer from "./SectionContainer"
import ButtonActionEmpty from "./ButtonActionEmpty"
import SectionForm from "./SectionForm"
import useExquesiteState from "./hook/useExquesiteState"

type InitState = Pick<Experience, "role" | "expertise">
const INIT_STATE: InitState = {
  role: "",
  expertise: [],
}
const ROLE_OPTIONS = Object.keys(ALL_ROLES)
function SectionExpertise({ isPublicView, profile }: PublicProfileSection) {
  const modalMachine = useOnOffMachine()
  const [state, setState] = useExquesiteState(INIT_STATE, {
    resetOnDeps: [profile?.address],
    onMutateFormatter({ expertise, role }) {
      return {
        role: profile?.role || role,
        expertise: profile?.expertise || expertise,
      }
    },
  })
  const { role, expertise } = state
  const EXPERTISE_OPTIONS = role ? ALL_ROLES[role].categories : []
  const showEmptyState = expertise.length === 0

  function handleOnSubmit(signedProfile: DataWithSignature<InitState>) {
    // TODO: add service to update profile
    console.debug(
      JSON.stringify({
        raw: JSON.stringify(signedProfile.data),
      })
    )
    modalMachine.turnOff()
    setState(signedProfile.data)
  }

  if (showEmptyState && isPublicView) return null
  return (
    <Fragment>
      <SectionForm
        onSubmit={handleOnSubmit}
        title="Areas of expertise"
        onClose={modalMachine.turnOff}
        show={modalMachine.isOn}
      >
        <ReactSelect
          required
          options={ROLE_OPTIONS}
          defaultValue={role}
          name={PROFILE_EXPERIENCE.role}
          label="What role are you looking for?"
          placeholder="Select role"
        />
        <ItemWithDescrition
          description={role ? "Pick up to 4." : "You must select a role."}
        >
          <ReactSelect
            required
            options={EXPERTISE_OPTIONS}
            defaultValue={expertise.length ? expertise : undefined}
            name={PROFILE_EXPERIENCE.expertise}
            label="Areas of expertise"
            placeholder="Select one or more"
            isMulti
          />
        </ItemWithDescrition>
      </SectionForm>
      <SectionContainer
        isPublicView={isPublicView}
        onEdit={modalMachine.turnOn}
        title="Areas of expertise"
        icon={<FaDiceD6 className="text-white text-lg" />}
      >
        <ul className="flex gap-4 flex-wrap mt-6">
          {showEmptyState && (
            <ButtonActionEmpty onClick={modalMachine.turnOn}>
              Add expertise
            </ButtonActionEmpty>
          )}
          {expertise.map((name) => {
            return <Expertise key={`expertise-${name}`}>{name}</Expertise>
          })}
        </ul>
      </SectionContainer>
    </Fragment>
  )
}

function Expertise({ children }: PropsWithChildren) {
  return (
    <li
      key={`user-area-${children}`}
      className="px-3 py-1 border-2 border-white rounded-full text-xl font-normal"
    >
      {children}
    </li>
  )
}

export default SectionExpertise
