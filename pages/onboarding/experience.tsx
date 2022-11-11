import {
  Fragment,
  type ReactNode,
  useEffect,
  type PropsWithChildren,
} from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import Select from "react-select"

import SeoTags from "@/components/SeoTags"
import Button from "@/components/Button"

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
]

type PrimitiveFormItemType = Partial<HTMLInputElement & HTMLTextAreaElement> & {
  startEnhancer?: ReactNode
  endEnhancer?: ReactNode
  label: string
}

function PrimitiveFormItem({
  label,
  startEnhancer,
  endEnhancer,
  primitiveElement,
  ...inputProps
}: PrimitiveFormItemType & {
  primitiveElement?: string
}) {
  const Element = primitiveElement as any
  return (
    <label className="py-2 text-left">
      <span className="text-zinc-700">{label}</span>
      <div className="flex w-full overflow-hidden items-center border hover:border-violet-400 rounded-lg mt-2 focus-within:ring-2 ring-violet-300 transition-all">
        {startEnhancer && <div className="p-2 border-r">{startEnhancer}</div>}
        <Element
          {...(inputProps as any)}
          className="placeholder:font-light outline-none flex-grow p-2"
        />
      </div>
    </label>
  )
}

function Input({ ...props }: PrimitiveFormItemType) {
  return <PrimitiveFormItem {...props} primitiveElement="input" />
}

function TextArea({ ...props }: PrimitiveFormItemType) {
  return <PrimitiveFormItem {...props} primitiveElement="textarea" rows={4} />
}

function ReactSelect({
  label,
  placeholder,
  isMulti,
}: {
  placeholder?: string
  isMulti?: boolean
  label: string
}) {
  return (
    <label className="py-2 text-left">
      <span className="text-zinc-700 inline-block mb-2">{label}</span>
      <Select
        isMulti={isMulti}
        placeholder={placeholder}
        theme={(theme) => ({
          ...theme,
          borderRadius: 16,
          colors: {
            ...theme.colors,
            primary: "#7c3aed",
            primary25: "#f4f4f5",
            dangerLight: "#f4f4f5",
            neutral10: "#f4f4f5",
            danger: "black",
          },
        })}
        className="custom-react-selct text-left"
        styles={{
          container: (currentStyle) => ({
            ...currentStyle,
          }),
          control: (currentStyle) => ({
            ...currentStyle,
            borderColor: "#e5e7eb",
            ":hover": {
              borderColor: "#e5e7eb",
            },
            borderRadius: "0.5rem",
            height: "2.75rem",
          }),
          placeholder: (currentStyle) => ({
            ...currentStyle,
            color: "#9ca3af",
            fontWeight: 300,
          }),
          menuList: (currentStyle) => ({
            ...currentStyle,
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }),
          menu: (currentStyle) => ({
            ...currentStyle,
            borderRadius: "0.5rem",
          }),
        }}
        options={options}
      />
    </label>
  )
}

export default function Experience() {
  const router = useRouter()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      //
    }
  }, [isConnected])
  return (
    <Fragment>
      <SeoTags title="InterLace | Create your profile" />
      <main className="flex items-center h-screen text-zinc-800 font-normal">
        <section className="hidden lg:flex flex-col justify-center space-y-4 w-full max-w-md px-32 overflow-auto h-full text-white bg-darker">
          {/** */}
        </section>
        <section className="flex-grow h-full bg-white overflow-auto pb-12 px-6">
          <div className="w-full text-center max-w-sm mx-auto flex flex-col items-center">
            <Stepper />
            <h3 className="font-bold mt-12">Skillset and Experience</h3>
            <p className="text-zinc-500 mt-2">
              We{"'"}re excited to learn more about you
            </p>
            <fieldset className="w-full text-left flex flex-col space-y-4 mt-8 mb-12">
              <ReactSelect
                placeholder="Select role"
                label="What role are you looking for?"
              />
              <ItemWithDescrition description="Pick up to 4.">
                <ReactSelect
                  isMulti
                  placeholder="Select one or more"
                  label="Areas of expertise"
                />
              </ItemWithDescrition>
              <TextArea
                label="Description"
                placeholder="Please describe how you can best contribute to a web3 project in 1 sentence."
              />
              <Input
                startEnhancer="https://"
                placeholder="portfolio.xyz"
                label="Website supporting your work history and skills"
              />
            </fieldset>
            <Button isFormItem isFull flavor="violet">
              Continue
            </Button>
          </div>
        </section>
      </main>
    </Fragment>
  )
}

function ItemWithDescrition({
  description,
  children,
}: PropsWithChildren<{
  description: string
}>) {
  return (
    <div>
      {children}
      <p className="text-zinc-500 font-light text-sm pt-1">{description}</p>
    </div>
  )
}

function Step({ isActive }: { isActive?: boolean }) {
  return (
    <div
      className={`${
        isActive ? "bg-violet-700" : "bg-zinc-100"
      } w-1/4 h-2 rounded-full`}
    />
  )
}

function Stepper() {
  return (
    <div className="hidden lg:flex mt-16 px-4 items-center w-full space-x-2">
      <Step />
      <Step isActive />
      <Step />
      <Step />
    </div>
  )
}
