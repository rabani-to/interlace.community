import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import toast from "react-hot-toast"

import { formatUndef } from "@/lib/helpers"
import { filestackClient } from "@/lib/filestack"
import { useOnboardingContext } from "@/lib/context/OnboardingContext"
import { PROFILE_DETAILS } from "@/lib/models/profile"

import Button from "@/components/Button"
import ReactDropZone from "@/components/forms/ReactDropZone"
import FormLayout from "@/components/layouts/FormLayout"
import Input from "@/components/forms/Input"

const FORM = PROFILE_DETAILS
export default function Details() {
  const router = useRouter()
  const [isWorking, setIsWorking] = useState(false)
  const { experience, preferences, details, setStepData } =
    useOnboardingContext()

  async function handleSubmit(data: FormData) {
    const toaster = toast.loading("Creating your profile...", {
      className: "font-bold",
    })
    setIsWorking(true)
    const rawProfileImage = data.get(FORM.profileImage) as File
    let profileImage = null
    if (rawProfileImage && rawProfileImage.size) {
      profileImage = (await filestackClient.upload(rawProfileImage)).url
    }
    const details = {
      profileImage,
      refCode: formatUndef(data.get(FORM.refCode)),
      telegram: formatUndef(data.get(FORM.telegram)),
      twitter: formatUndef(data.get(FORM.twitter)),
      address: formatUndef(data.get(FORM.address)),
    }
    setStepData("details", details)
    fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...details,
        ...experience,
        ...preferences,
      }),
    })
      .then(({ status }) => {
        if (status !== 200) throw "Failed"
      })
      .then(() => {
        // User stored in DB. Continue
        setTimeout(() =>
          router.push({
            pathname: "/dashboard",
            query: {
              showWelcome: true,
            },
          })
        )
      })
      .catch(() => {
        toast.error("Oops. Something wrong happended")
      })
      .finally(() => {
        toast.dismiss(toaster)
        setIsWorking(false)
      })
  }

  useEffect(() => {
    // Prefer dashboard view
    router.prefetch("/dashboard")
  }, [])

  return (
    <FormLayout
      onSubmit={handleSubmit}
      stepIndex={3}
      pageTitle="InterLace | Contact Details"
      title="Contact Details"
      description="You're almost to your Web3 profile!"
    >
      <div
        hidden={!isWorking}
        className="fixed bg-white/70 backdrop-blur-sm inset-0 z-30"
      />
      <fieldset className="w-full text-left flex flex-col space-y-4 mt-8 mb-12">
        <span className="text-zinc-700 pt-2">Profile image</span>
        <ReactDropZone name={FORM.profileImage} />
        <Input
          required
          name={FORM.address}
          label="Wallet Adress"
          placeholder="0x0ad...9f"
        />
        <Input
          name={FORM.telegram}
          defaultValue={details?.telegram}
          label="Telegram handle"
          placeholder="@Olivia22"
        />
        <Input
          name={FORM.twitter}
          defaultValue={details?.twitter}
          label="Twitter handle"
          placeholder="@Olivia22"
        />
        <Input
          name={FORM.refCode}
          defaultValue={details?.refCode}
          label="DAO Referral Code "
          placeholder="VioletVerse231"
        />
      </fieldset>
      <Button isFormItem isFull flavor="violet">
        Create Web3 Profile
      </Button>
    </FormLayout>
  )
}
