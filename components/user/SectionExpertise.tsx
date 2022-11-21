import { type FormEvent, Fragment, useEffect, useState } from "react"
import { FaDiceD6 } from "react-icons/fa"

import ALL_ROLES from "@/lib/models/roles"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import ReactSelect from "@/components/forms/ReactSelect"
import PrimitiveDialog from "@/components/PrimitiveModal"
import ItemWithDescrition from "@/components/forms/ItemWithDescription"
import Button from "@/components/Button"
import ProfileSection from "./ProfileSection"

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log({ areas, role })
    setRenderAreas((current) => areas || current)
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
        <h3>Areas of expertise</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-4">
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
          <Button className="mt-6" flavor="violet" isFormItem isFull>
            Save changes
          </Button>
        </form>
      </PrimitiveDialog>
      <ProfileSection
        onEdit={modalMachine.turnOn}
        title="Areas of expertise"
        icon={<FaDiceD6 className="text-white text-lg" />}
      >
        <div className="flex gap-4 flex-wrap mt-6">
          {renderAreas.length === 0 && (
            <Button
              onClick={modalMachine.turnOn}
              className="bg-white/5 !text-base"
            >
              Add one
            </Button>
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
