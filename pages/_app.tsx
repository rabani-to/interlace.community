import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Work_Sans } from "@next/font/google"

const fontWorkSans = Work_Sans()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fontWorkSans.className}>
      <Component {...pageProps} />
    </main>
  )
}
