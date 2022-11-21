import { Fragment, useEffect, useRef } from "react"
import "@/styles/globals.css"
import "@/styles/components.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"
import Link from "next/link"

import { Work_Sans } from "@next/font/google"
import {
  WagmiConfig,
  createClient,
  chain,
  configureChains,
  useAccount,
} from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import toast, { Toaster } from "react-hot-toast"

import { OnboardingProvider } from "@/lib/context/OnboardingContext"
import { rainbowMagicConnector } from "@/lib/magic"

const { provider, chains } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
)

const defaultWallets = getDefaultWallets({
  appName: "InterLace",
  chains,
}).wallets

const connectors = connectorsForWallets([
  ...defaultWallets,
  {
    groupName: "Use email instead",
    wallets: [rainbowMagicConnector({ chains })],
  },
])

const client = createClient({
  //autoConnect: true,
  provider,
  connectors,
})

const fontWorkSans = Work_Sans({
  weight: ["300", "400", "500"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fontWorkSans.className}>
      <WagmiConfig client={client}>
        <RainbowKitProvider
          appInfo={{
            disclaimer: Disclaimer,
          }}
          modalSize="compact"
          chains={chains}
        >
          <ModalLayout>
            <OnboardingProvider>
              <Component {...pageProps} />
            </OnboardingProvider>
          </ModalLayout>
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  )
}

function ModalLayout({ children }: any) {
  const toastRef = useRef<string>()
  const { isConnecting, isConnected } = useAccount()

  useEffect(() => {
    toast.dismiss(toastRef.current)
    if (isConnecting) {
      toastRef.current = toast.loading("Connecting...", {
        className: "font-bold",
        duration: 7_000, // hide after 7sec
      })
    }
  }, [isConnecting, isConnected])

  return (
    <Fragment>
      <Toaster />
      {children}
    </Fragment>
  )
}

// Used to replace RainbowKit footer content
function Disclaimer() {
  return (
    <Link href="/" target="_blank" className="text-sm text-zinc-400">
      interlace.community
    </Link>
  )
}
