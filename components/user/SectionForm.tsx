import type { PropsWithChildren, FormEvent } from "react"
import { jsonifyFormValues } from "@/lib/helpers"
import useSignProfileUpdate from "@/lib/hooks/useSignProfileUpdate"

import PrimitivePane from "@/components/PrimitivePane"
import Button from "@/components/Button"

function SectionForm({
  onClose,
  show,
  children,
  onSubmit,
  title,
}: PropsWithChildren<{
  onClose(): void
  onSubmit<jsonifyValues extends { signature: string }>(
    data: jsonifyValues
  ): void
  show: boolean
  title: string
}>) {
  const { requestSigAsync } = useSignProfileUpdate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const profile = jsonifyFormValues(e.currentTarget)
    const signedProfile = await requestSigAsync(profile)
    if (signedProfile) {
      onSubmit(signedProfile)
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
