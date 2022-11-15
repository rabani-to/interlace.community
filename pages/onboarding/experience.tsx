import { useRouter } from "next/router"
import { useOnboardingContext } from "@/lib/context/OnboardingContext"
import { formatUndef } from "@/lib/helpers"

import Button from "@/components/Button"
import FormLayout from "@/components/layouts/FormLayout"
import ItemWithDescrition from "@/components/forms/ItemWithDescription"
import TextArea from "@/components/forms/TextArea"
import ReactSelect from "@/components/forms/ReactSelect"
import Input from "@/components/forms/Input"

const FORM = {
  role: "role",
  description: "description",
  portfolio: "portfolio",
  expertise: "expertise",
}
export default function Experience() {
  const router = useRouter()
  const { setStepData } = useOnboardingContext()

  function handleSubmit(form: FormData) {
    setStepData("experience", {
      description: formatUndef(form.get(FORM.description)),
      expertise: formatUndef(form.getAll(FORM.expertise)),
      portfolio: formatUndef(form.get(FORM.portfolio)),
      role: formatUndef(form.get(FORM.role)),
    })
    setTimeout(() => router.push("preferences/"))
  }

  return (
    <FormLayout
      onSubmit={handleSubmit}
      stepIndex={1}
      pageTitle="InterLace | Skillset and Experience"
      title="Skillset and Experience"
      description="We're excited to learn more about you"
    >
      <fieldset className="w-full text-left flex flex-col space-y-4 mt-8 mb-12">
        <ReactSelect
          name={FORM.role}
          required
          label="What role are you looking for?"
          placeholder="Select role"
        />
        <ItemWithDescrition description="Pick up to 4.">
          <ReactSelect
            name={FORM.expertise}
            required
            label="Areas of expertise"
            placeholder="Select one or more"
            isMulti
          />
        </ItemWithDescrition>
        <TextArea
          name={FORM.description}
          required
          label="Description"
          placeholder="Please describe how you can best contribute to a web3 project in 1 sentence."
        />
        <Input
          name={FORM.portfolio}
          required
          label="Website supporting your work history and skills"
          placeholder="portfolio.xyz"
          startEnhancer="https://"
        />
      </fieldset>
      <Button isFormItem isFull flavor="violet">
        Continue
      </Button>
    </FormLayout>
  )
}
