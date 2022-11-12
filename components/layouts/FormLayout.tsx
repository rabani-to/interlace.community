import { Fragment, type PropsWithChildren } from "react"
import SeoTags from "@/components/SeoTags"
import { classnames } from "@/lib/helpers"
import { MdDone } from "react-icons/md"

function FormLayout({
  pageTitle,
  title,
  stepIndex,
  children,
  description,
}: PropsWithChildren<{
  title: string
  stepIndex: number
  pageTitle: string
  description: string
}>) {
  return (
    <Fragment>
      <style>{"body{background:white !important}"}</style>
      <SeoTags title={pageTitle} />
      <main className="flex lg:h-screen text-zinc-800 font-normal">
        <LegendStepper index={stepIndex} />
        <section className="flex-grow h-full bg-white overflow-auto pb-12 px-6">
          <div className="w-full text-center max-w-sm mx-auto flex flex-col items-center">
            <Stepper index={stepIndex} />
            <h3 className="font-bold mt-12">{title}</h3>
            <p className="text-zinc-500 mt-2">{description}</p>
            {children}
          </div>
        </section>
      </main>
    </Fragment>
  )
}

function LegendStepperRow({
  title,
  description,
  isCurrent,
  isCompleted,
}: {
  title: string
  description: string
  isCurrent: boolean
  isCompleted: boolean
}) {
  return (
    <div className="relative flex z-1 space-x-4 items-center">
      <div
        className={classnames(
          isCurrent
            ? "bg-violet-500"
            : isCompleted
            ? "bg-violet-400"
            : "bg-violet-200",
          "flex items-center justify-center min-w-[3rem] h-12 rounded-full border-4 border-darker"
        )}
      >
        {isCompleted && <MdDone className="text-2xl" />}
        {isCurrent && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <div>
        <h4>{title}</h4>
        <p className="font-light text-violet-100 whitespace-nowrap">
          {description}
        </p>
      </div>
    </div>
  )
}
const STEPS = [
  {
    title: "Connect",
    description: "Connect to a wallet",
  },

  {
    title: "Skillset and Experiences",
    description: "Please provide work experince ",
  },
  {
    title: "Connection Preferences",
    description: "Payment type and time commitment",
  },
  {
    title: "Contact Details ",
    description: "Your social accounts",
  },
]

function LegendStepper({ index }: { index: number }) {
  return (
    <section className="hidden lg:flex flex-col justify-center pl-12 w-full max-w-md overflow-hidden h-full text-white bg-darker">
      <div className="relative flex flex-col gap-8">
        <div className="absolute w-1 border-darker border-y-4 h-full bg-violet-200 ml-6 -translate-x-1/2" />
        {STEPS.map(({ title, description }, itemIdx) => (
          <LegendStepperRow
            title={title}
            description={description}
            isCurrent={index === itemIdx}
            isCompleted={index > itemIdx}
            key={`step-for-${title}`}
          />
        ))}
      </div>
    </section>
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

function Stepper({ index }: { index: number }) {
  return (
    <div className="hidden lg:flex mt-16 px-4 items-center w-full space-x-2">
      <Step />
      <Step isActive={1 === index} />
      <Step isActive={2 === index} />
      <Step isActive={3 === index} />
    </div>
  )
}

export default FormLayout
