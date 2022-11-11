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
      pageTitle="InterLace | Contact Details"
      title="Contact Details"
      description="You're almost to your Web3 profile!"
    >
      <fieldset className="w-full text-left flex flex-col space-y-4 mt-8 mb-12">
        <Input label="Telegram handle" placeholder="@Olivia22" />
        <Input label="Twitter handle" placeholder="@Olivia22" />
        <Input label="DAO Referral Code " placeholder="VioletVerse231" />
      </fieldset>
      <Button isFormItem isFull flavor="violet">
        Create Web3 Profile
      </Button>
    </FormLayout>
  )
}
