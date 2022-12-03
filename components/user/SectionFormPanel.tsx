import type { ReactNode } from "react"
export type DataWithSignature<Data> = { data: Data; signature: string }

import { OnOffMachine } from "@/lib/hooks/useOnOffMachine"
import useExquesiteState from "./hook/useExquesiteState"
import SectionForm from "./SectionForm"

export type CoreFormPanelProps<InitState> = {
  machine: OnOffMachine
  initState: InitState
  onSubmit(state: DataWithSignature<InitState>): void
  signatureFormatter?(json: InitState): any
}

function SectionFormPanel<InitState>({
  machine,
  onSubmit,
  initState,
  signatureFormatter,
  title,
  children,
}: CoreFormPanelProps<InitState> & {
  title: string
  children(state: InitState): ReactNode
}) {
  const [data] = useExquesiteState(initState, {
    resetOnDeps: [machine.isOff, initState],
  })

  function handleSubmit(newState: DataWithSignature<InitState>) {
    machine.turnOff()
    onSubmit(newState)
  }

  return (
    <SectionForm<InitState>
      show={machine.isOn}
      onClose={machine.turnOff}
      title={title}
      signatureFormatter={signatureFormatter}
      onSubmit={handleSubmit}
    >
      {children(data)}
    </SectionForm>
  )
}

export default SectionFormPanel
