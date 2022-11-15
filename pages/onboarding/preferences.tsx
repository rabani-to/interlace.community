import { useRouter } from "next/router"
import { useOnboardingContext } from "@/lib/context/OnboardingContext"
import { formatUndef } from "@/lib/helpers"

import Button from "@/components/Button"
import FormLayout from "@/components/layouts/FormLayout"
import ReactSelect from "@/components/forms/ReactSelect"
import Input from "@/components/forms/Input"

const FORM = {
  commitment: "commitment",
  hourlyRate: "hourlyRate",
  paymentOptions: "paymentOptions",
}
export default function Preferences() {
  const router = useRouter()
  const { setStepData } = useOnboardingContext()

  function handleSubmit(data: FormData) {
    setStepData("preferences", {
      commitment: formatUndef(data.get(FORM.commitment)),
      hourlyRate: formatUndef(data.get(FORM.hourlyRate)),
      paymentOptions: formatUndef(data.get(FORM.paymentOptions)),
    })
    setTimeout(() => router.push("details/"))
  }

  return (
    <FormLayout
      onSubmit={handleSubmit}
      stepIndex={2}
      pageTitle="InterLace | Connection Preferences"
      title="Connection Preferences"
      description="We're excited to learn more about you"
    >
      <fieldset className="w-full text-left flex flex-col space-y-4 mt-8 mb-12">
        <ReactSelect
          name={FORM.commitment}
          required
          label="What is your preferred type of commitment?"
          placeholder="Select time"
        />
        <ReactSelect
          name={FORM.paymentOptions}
          required
          label="What payment options are you open to?"
          placeholder="Select payment type"
        />
        <Input
          name={FORM.hourlyRate}
          required
          label="Hourly rate (in USD)"
          type="number"
          step=".1"
          min="1"
          placeholder="Enter number"
        />
      </fieldset>
      <Button isFormItem isFull flavor="violet">
        Continue
      </Button>
    </FormLayout>
  )
}
