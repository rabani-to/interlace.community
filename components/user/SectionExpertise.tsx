import { Fragment, useEffect, useState } from "react"
import { FaDiceD6 } from "react-icons/fa"

import ALL_ROLES from "@/lib/models/roles"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import ReactSelect from "@/components/forms/ReactSelect"
import ItemWithDescrition from "@/components/forms/ItemWithDescription"
import ProfileSection from "./ProfileSection"
import ButtonActionEmpty from "./ButtonActionEmpty"
import SectionForm from "./SectionForm"

const ROLE_OPTIONS = Object.keys(ALL_ROLES)
function SectionExpertise() {
  const modalMachine = useOnOffMachine()
  const [role, setRole] = useState<string>()
  const [areas, setAreas] = useState<string[]>()
  const [renderAreas, setRenderAreas] = useState<string[]>([])
  const EXPERTISE_OPTIONS = role ? ALL_ROLES[role].categories : []

  useEffect(() => {
    setRole(undefined)
    setAreas(undefined)
  }, [modalMachine.isOff])

  function handleSubmit() {
    console.log({ areas, role })
    setRenderAreas((current) => areas || current)
    modalMachine.turnOff()
  }

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
            onSelect={(areas) => setAreas(areas.map(({ value }) => value))}
            name="areas"
            required
            label="Areas of expertise"
            placeholder="Select one or more"
            isMulti
          />
        </ItemWithDescrition>
      </SectionForm>
      <ProfileSection
        onEdit={modalMachine.turnOn}
        title="Areas of expertise"
        icon={<FaDiceD6 className="text-white text-lg" />}
      >
        <div className="flex gap-4 flex-wrap mt-6">
          {renderAreas.length === 0 && (
            <ButtonActionEmpty onClick={modalMachine.turnOn}>
              Add expertise
            </ButtonActionEmpty>
          )}
          {renderAreas.map((area) => {
            return (
              <div
                key={`user-area-${area}`}
                className="px-3 py-1 border-2 border-white rounded-full text-xl font-normal"
              >
                {area}
              </div>
            )
          })}
        </div>
      </ProfileSection>
    </Fragment>
  )
}

export default SectionExpertise
