import {
  Chain,
  Wallet,
  getWalletConnectConnector,
} from "@rainbow-me/rainbowkit"
import { setupWalletSelector } from "@near-wallet-selector/core"
import { setupNeth } from "@near-wallet-selector/neth"

export interface WalletOptions {
  chains: Chain[]
}

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
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector
          return uri
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://wallet.near.org",
          steps: [
            {
              description:
                "Securely store and stake your NEAR tokens and compatible assets with NEAR Wallet.",
              step: "install",
              title: "Get Near Wallet",
            },
            {
              description:
                "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Scan the QR Code",
            },
          ],
        },
      },
    }
  },
})

export const getNearWalletSelector = async () =>
  await setupWalletSelector({
    network: "testnet",
    modules: [setupNeth()],
  })
