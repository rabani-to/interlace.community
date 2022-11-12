import { Fragment, type PropsWithChildren } from "react"
import SeoTags from "@/components/SeoTags"

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
      <SeoTags title={pageTitle} />
      <main className="flex bg-white items-center min-h-screen lg:h-screen text-zinc-800 font-normal">
        <section className="hidden lg:flex flex-col justify-center space-y-4 w-full max-w-md px-32 overflow-auto h-full text-white bg-darker">
          {/** */}
        </section>
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
