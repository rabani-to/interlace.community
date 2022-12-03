import type { ProfileWithExtras } from "@/types/shared"
import type { PropsWithChildren, FormEvent } from "react"
import { jsonifyFormValues } from "@/lib/helpers"
import useSignProfileUpdate from "@/lib/hooks/useSignProfileUpdate"

import PrimitivePane from "@/components/PrimitivePane"
import Button from "@/components/Button"

function SectionForm<DataType = ProfileWithExtras>({
  onClose,
  show,
  children,
  onSubmit,
  title,
  signatureFormatter = (json) => json,
}: PropsWithChildren<{
  onClose(): void
  onSubmit(signedProfile: { signature: string; data: DataType }): void
  signatureFormatter?(json: DataType): any
  show: boolean
  title: string
}>) {
  const { requestSigAsync } = useSignProfileUpdate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = jsonifyFormValues(e.currentTarget)
    // Request user to sign for this content update
    const signature = await requestSigAsync(signatureFormatter(data))
    if (signature) {
      onSubmit({
        data,
        signature,
      })
    }
  }

  return (
    <PrimitivePane
      background="bg-white"
      className="text-black"
      onClose={onClose}
      show={show}
    >
      <h3 className="mt-1 mb-2">{title}</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-grow flex-col gap-2 pb-4"
      >
        {children}
        <div className="flex-grow" />
        <Button className="mt-6" flavor="violet" isFormItem isFull>
          Save changes
        </Button>
      </form>
    </PrimitivePane>
  )
}

export default SectionForm
