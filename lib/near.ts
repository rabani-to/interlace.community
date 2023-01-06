import {
  Chain,
  Wallet,
  getWalletConnectConnector,
} from "@rainbow-me/rainbowkit"
import { connect, keyStores, WalletConnection } from "near-api-js"

export interface WalletOptions {
  chains: Chain[]
}

export const LOGIN_WALLET_URL_SUFFIX = "/login/"
const keyStore =
  typeof window !== "undefined"
    ? new keyStores.BrowserLocalStorageKeyStore()
    : undefined

export const nearWalletConnector = ({ chains }: WalletOptions): Wallet => ({
  id: "Near Wallet",
  name: "Near Wallet",
  iconUrl: "/near.svg",
  iconBackground: "#fff",
  downloadUrls: {
    qrCode: "https://wallet.near.org/create",
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains })
    const customConnector: Partial<typeof connector> = {
      connect: async () => {
        const wallet = await getNearWalletConnection()

        if (!wallet.isSignedIn()) {
          await wallet.requestSignIn({})
        }
        const account = wallet.getAccountId()
        console.debug({ account, isNear: true })

        return {
          provider: {},
          account,
          chain: "",
        } as any
      },
      getAccount: async () => {
        const wallet = await getNearWalletConnection()
        if (wallet.isSignedIn()) return wallet.getAccountId() as any
        return ""
      },
      disconnect: async () => {
        const wallet = await getNearWalletConnection()
        wallet.signOut()
      },
    }

    Object.assign(connector, customConnector)

    return {
      connector,
    }
  },
})

export const generateNearWalletConnectURI = async () => {
  const { href } = new URL(window.location.href)
  const connection = await getNearWalletConnection()
  const newUrl = new URL(connection._walletBaseUrl + LOGIN_WALLET_URL_SUFFIX)
  newUrl.searchParams.set("success_url", href)
  newUrl.searchParams.set("failure_url", href)
  return newUrl.toString()
}

export const getNearWalletConnection = async () =>
  new WalletConnection(
    await connect({
      networkId: "mainnet",
      keyStore,
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.mainnet.near.org",
    }),
    "InterLace"
  )
