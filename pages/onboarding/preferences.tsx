import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"

import Button from "@/components/Button"
import FormLayout from "@/components/layouts/FormLayout"
import ItemWithDescrition from "@/components/forms/ItemWithDescription"
import TextArea from "@/components/forms/TextArea"
import ReactSelect from "@/components/forms/ReactSelect"
import Input from "@/components/forms/Input"

export default function Preferences() {
  const router = useRouter()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      //
    }
  }, [isConnected])

  return (
    <FormLayout
      pageTitle="InterLace | Connection Preferences"
      title="Connection Preferences"
      description="We're excited to learn more about you"
    >
      <fieldset className="w-full text-left flex flex-col space-y-4 mt-8 mb-12">
        <ReactSelect
          label="What is your preferred type of commitment?"
          placeholder="Select time"
        />
        <ReactSelect
          label="What payment options are you open to?"
          placeholder="Select payment type"
        />
        <Input label="Hourly rate" placeholder="Enter number" />
      </fieldset>
      <Button
        isLink
        isFormItem
        href="/onboarding/details"
        isFull
        flavor="violet"
      >
        Continue
      </Button>
    </FormLayout>
  )
}
