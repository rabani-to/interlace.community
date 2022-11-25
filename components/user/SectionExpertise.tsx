import type { PublicProfileSection } from "@/types/shared"
import { Fragment, useState } from "react"
import { FaDiceD6 } from "react-icons/fa"

import ALL_ROLES from "@/lib/models/roles"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import ReactSelect from "@/components/forms/ReactSelect"
import ItemWithDescrition from "@/components/forms/ItemWithDescription"
import SectionContainer from "./SectionContainer"
import ButtonActionEmpty from "./ButtonActionEmpty"
import SectionForm from "./SectionForm"

const ROLE_OPTIONS = Object.keys(ALL_ROLES)
function SectionExpertise({ isPublicView, profile }: PublicProfileSection) {
  console.log({ profile })
  const modalMachine = useOnOffMachine()
  const [role, setRole] = useState<string>(profile?.role!)
  const [areas, setAreas] = useState<string[]>(profile?.expertise || [])
  const [formAreas, setFormAreas] = useState<string[]>()
  const EXPERTISE_OPTIONS = role ? ALL_ROLES[role].categories : []

  function handleSubmit() {
    setAreas((currentAreas) => formAreas || currentAreas)
    modalMachine.turnOff()
  }

  function handleSelectAreas(areas: any[]) {
    setFormAreas(areas.map(({ value }) => value))
  }

  const showEmptyState = areas.length === 0
  if (showEmptyState && isPublicView) return null
  return (
    <Fragment>
      <SectionForm
        onSubmit={handleSubmit}
        title="Areas of expertise"
        onClose={modalMachine.turnOff}
        show={modalMachine.isOn}
      >
        <ReactSelect
          options={ROLE_OPTIONS}
          defaultValue={role}
          onSelect={([{ value }]) => setRole(value)}
          name="role"
          required
          label="What role are you looking for?"
          placeholder="Select role"
        />
        <ItemWithDescrition
          description={role ? "Pick up to 4." : "You must select a role."}
        >
          <ReactSelect
            options={EXPERTISE_OPTIONS}
            defaultValue={areas.length ? areas : undefined}
            onSelect={handleSelectAreas}
            name="areas"
            required
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
          {areas.map((areaName) => {
            return (
              <li
                key={`user-area-${areaName}`}
                className="px-3 py-1 border-2 border-white rounded-full text-xl font-normal"
              >
                {areaName}
              </li>
            )
          })}
        </ul>
      </SectionContainer>
    </Fragment>
  )
}

export default SectionExpertise
