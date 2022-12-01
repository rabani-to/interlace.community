import { useEffect, useState } from "react"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount, useDisconnect } from "wagmi"
import { beaconClient, BeaconEvent } from "@/lib/beacon"
import { noOp } from "@/lib/helpers"

type SharedAccount = {
  address: string
  isConnected: boolean
  disconnect(): void
  openConnectModal(): void
}

const INIT_STATE = {
  address: "",
  isConnected: false,
  disconnect: noOp,
}
function useHybridAccount() {
  const { openConnectModal = noOp } = useConnectModal()
  const [account, setAccount] = useState(INIT_STATE)
  const wagmiAccount = useAccount()

  const { disconnect: wagmiDisconnecet } = useDisconnect()
  const asyncSetAccount = (account: Partial<SharedAccount>) => {
    setAccount((current) => ({ ...current, ...account }))
  }

  const makeDisconnect = (disconnect: () => void) => {
    return function proxyDisconnect() {
      setAccount(() => {
        disconnect()
        return INIT_STATE
      })
    }
  }

  useEffect(() => {
    // beaconClient.subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, revalidate)
  }, [])

  useEffect(() => {
    if (wagmiAccount.isConnected && wagmiAccount.address) {
      asyncSetAccount({
        ...wagmiAccount,
        disconnect: makeDisconnect(wagmiDisconnecet),
      })
    } else {
      setAccount(INIT_STATE)
    }
  }, [wagmiAccount.address])

  useEffect(() => {
    async function handleBeacon() {
      const activeAccount = await beaconClient.getActiveAccount()
      if (activeAccount) {
        asyncSetAccount({
          ...activeAccount,
          disconnect: makeDisconnect(
            beaconClient.clearActiveAccount.bind(beaconClient)
          ),
        })
      }
    }
    // handleBeacon()
  }, [])

  return {
    ...account,
    openConnectModal,
  }
}

export default useHybridAccount
