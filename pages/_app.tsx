import { Fragment, useEffect, useRef } from "react"
import "@/styles/globals.css"
import "@/styles/components.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"
import Link from "next/link"
import { useRouter } from "next/router"

import { Work_Sans } from "@next/font/google"
import {
  WagmiConfig,
  createClient,
  configureChains,
  useAccount,
  mainnet,
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
import { nearWalletConnector } from "@/lib/near"
import { tezosWalletConnector } from "@/lib/beacon"

const { provider, chains } = configureChains([mainnet], [publicProvider()])

const defaultWallets = getDefaultWallets({
  appName: "InterLace",
  chains,
}).wallets

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      tezosWalletConnector({
        chains,
      }),
    ],
  },
  ...defaultWallets,
  {
    groupName: "Connect with email",
    wallets: [rainbowMagicConnector({ chains })],
  },
])

const client = createClient({
  autoConnect: false,
  provider,
  connectors,
})

const fontWorkSans = Work_Sans({
  weight: ["300", "400", "500"],
  subsets: [],
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
  const router = useRouter()
  const { isConnecting, isConnected } = useAccount()

  useEffect(() => {
    const omitPathnames = ["/"]
    const omitToaster = omitPathnames.includes(router.pathname)
    toast.dismiss(toastRef.current)
    if (omitToaster) return
    if (isConnecting) {
      toastRef.current = toast.loading("Connecting...", {
        className: "font-bold",
        duration: 7_000, // hide after 7sec
      })
    }
  }, [isConnecting, isConnected, router.pathname])

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
