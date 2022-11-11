import { MagicAuthConnector } from "@everipedia/wagmi-magic-connector"
import { chain } from "wagmi"

const PUB_KEY = "pk_live_0B842C66A3876C25"
export const getMagicConnector = (chains?: any[]) => {
  return new MagicAuthConnector({
    chains,
    options: {
      apiKey: PUB_KEY,
      accentColor: "#1E1E1E",
      customHeaderText: "Continue with email",
      oauthOptions: {
        providers: ["google"],
      },
      magicSdkConfiguration: {
        network: {
          rpcUrl: chain.mainnet.rpcUrls.default,
          chainId: chain.mainnet.id,
        },
      },
    },
  }) as any
}

export const rainbowMagicConnector = ({ chains }: { chains?: any[] }) => ({
  id: "magic",
  name: "Magic Link",
  iconUrl: "/magic.png",
  iconBackground: "#fff",
  createConnector: () => {
    return {
      connector: getMagicConnector(chains),
    }
  },
})
