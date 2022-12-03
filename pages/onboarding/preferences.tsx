import { useRouter } from "next/router"
import { useOnboardingContext } from "@/lib/context/OnboardingContext"
import { formatUndef } from "@/lib/helpers"
import { PROFILE_PREFERENCES } from "@/lib/models/profile"
import { COMMITMENT_TIME, HOURLY_RATES } from "@/lib/models/time"
import { PAYMENT_TYPES } from "@/lib/models/currency"

import Button from "@/components/Button"
import FormLayout from "@/components/layouts/FormLayout"
import ReactSelect from "@/components/forms/ReactSelect"
import InputNumber from "@/components/forms/InputNumber"

const FORM = PROFILE_PREFERENCES
export default function Preferences() {
  const router = useRouter()
  const { setStepData, preferences } = useOnboardingContext()

  function handleSubmit(data: FormData) {
    setStepData("preferences", {
      commitment: formatUndef(data.get(FORM.commitment)),
      hourlyRate: formatUndef(data.get(FORM.hourlyRate)),
      paymentOptions: formatUndef(data.get(FORM.paymentOptions)),
      workingTime: formatUndef(data.get(FORM.workingTime)),
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
          options={COMMITMENT_TIME}
          name={FORM.commitment}
          defaultValue={preferences?.commitment}
          label="What is your preferred type of commitment?"
          placeholder="Select time"
          required
        />
        <ReactSelect
          options={HOURLY_RATES}
          label="Expected Working Time"
          placeholder="Select a range"
          name={FORM.workingTime}
          defaultValue={preferences?.workingTime}
          required
        />
        <ReactSelect
          options={PAYMENT_TYPES}
          name={FORM.paymentOptions}
          defaultValue={preferences?.paymentOptions}
          label="What payment options are you open to?"
          placeholder="Select payment type"
          required
        />
        <InputNumber
          name={FORM.hourlyRate}
          defaultValue={preferences?.hourlyRate}
          label="Hourly rate (in USD)"
          placeholder="Enter number"
          required
        />
      </fieldset>
      <Button isFormItem isFull flavor="violet">
        Continue
      </Button>
    </FormLayout>
  )
}
