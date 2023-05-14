import type { WalletOptions } from "./near"
import { DAppClient } from "@airgap/beacon-sdk"
import { getWalletConnectConnector, type Wallet } from "@rainbow-me/rainbowkit"
export const beaconClient: DAppClient =
  typeof window !== "undefined"
    ? new DAppClient({ name: "interlace.community" })
    : ({} as any)

export async function connect() {
  const permissions = await beaconClient.requestPermissions()
  console.debug("New connection:", permissions.address)
  return permissions
}

export const tezosWalletConnector = ({ chains }: WalletOptions): Wallet => ({
  id: "Tezos",
  name: "Beacon - Tezos",
  iconUrl: "/beacon.svg",
  iconBackground: "#fff",
  downloadUrls: {
    qrCode: "https://wallet.near.org/create",
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains })
    const customConnector: Partial<typeof connector> = {
      connect: async () => {
        const permissions = await connect()

        return {
          provider: {},
          account: permissions.address,
          chain: "custom",
        } as any
      },
      getAccount: async () => {
        const wallet = await beaconClient.getActiveAccount()
        if (wallet?.address) return wallet?.address as any
        return ""
      },
      disconnect: async () => await beaconClient.disconnect(),
    }

    Object.assign(connector, customConnector)

    return {
      connector,
    }
  },
})
