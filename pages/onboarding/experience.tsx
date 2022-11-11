import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"

import Button from "@/components/Button"
import FormLayout from "@/components/layouts/FormLayout"
import ItemWithDescrition from "@/components/forms/ItemWithDescription"
import TextArea from "@/components/forms/TextArea"
import ReactSelect from "@/components/forms/ReactSelect"
import Input from "@/components/forms/Input"

export default function Experience() {
  const router = useRouter()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      //
    }
  }, [isConnected])

  return (
    <FormLayout
      pageTitle="InterLace | Skillset and Experience"
      title="Skillset and Experience"
      description="We're excited to learn more about you"
    >
      <fieldset className="w-full text-left flex flex-col space-y-4 mt-8 mb-12">
        <ReactSelect
          label="What role are you looking for?"
          placeholder="Select role"
        />
        <ItemWithDescrition description="Pick up to 4.">
          <ReactSelect
            label="Areas of expertise"
            placeholder="Select one or more"
            isMulti
          />
        </ItemWithDescrition>
        <TextArea
          label="Description"
          placeholder="Please describe how you can best contribute to a web3 project in 1 sentence."
        />
        <Input
          label="Website supporting your work history and skills"
          placeholder="portfolio.xyz"
          startEnhancer="https://"
        />
      </fieldset>
      <Button
        isLink
        isFormItem
        href="/onboarding/preferences"
        isFull
        flavor="violet"
      >
        Continue
      </Button>
    </FormLayout>
  )
}
