import { beaconClient } from "@/lib/beacon"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

type SharedAccount = {
  address: string
  isConnected: boolean
}

function useHybridAccount() {
  const [account, setAccount] = useState({
    address: "",
    isConnected: false,
  })
  const wagmiAccount = useAccount()

  const asyncSetAccount = (account: Partial<SharedAccount>) => {
    setAccount((current) => ({ ...current, ...account }))
  }

  useEffect(() => {
    if (wagmiAccount.address) {
      asyncSetAccount(wagmiAccount)
    }
  }, [wagmiAccount.address])

  useEffect(() => {
    async function handleBeacon() {
      const activeAccount = await beaconClient.getActiveAccount()
      if (activeAccount) {
        asyncSetAccount(activeAccount)
      }
    }
    handleBeacon()
  }, [])

  return account
}

export default useHybridAccount
