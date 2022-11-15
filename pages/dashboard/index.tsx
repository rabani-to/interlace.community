import { Fragment } from "react"

import SeoTags from "@/components/SeoTags"

export default function Dashboard() {
  return (
    <Fragment>
      <SeoTags title="InterLace | Dashboard" />
      <main className="flex items-center justify-center min-h-screen text-zinc-800 font-normal">
        <h2 className="text-white font-bold">Here will be unicorns</h2>
      </main>
    </Fragment>
  )
}
