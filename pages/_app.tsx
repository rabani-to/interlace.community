import "@/styles/globals.css"
import "@/styles/components.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"
import Link from "next/link"

import { Work_Sans } from "@next/font/google"
import { WagmiConfig, createClient, chain, configureChains } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"

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
  provider,
  connectors,
})

const fontWorkSans = Work_Sans()

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
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
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
