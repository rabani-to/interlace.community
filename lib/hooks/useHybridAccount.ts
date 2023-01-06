import { useEffect, useState } from "react"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount, useDisconnect } from "wagmi"
import { getNearWalletConnection } from "@/lib/near"
import { noOp } from "@/lib/helpers"

const INIT_STATE = {
  address: "",
  disconnect: noOp,
}

function useHybridAccount() {
  const { openConnectModal = noOp } = useConnectModal()
  const [account, setAccount] = useState(INIT_STATE)
  const wagmiAccount = useAccount()

  const { disconnect: wagmiDisconnect } = useDisconnect()

  const makeDisconnect = (disconnect: () => void) => {
    return function proxyDisconnect() {
      setAccount(() => {
        disconnect()
        return INIT_STATE
      })
    }
  }

  useEffect(() => {
    if (wagmiAccount.isConnected && wagmiAccount.address) {
      setAccount({
        address: wagmiAccount.address,
        disconnect: makeDisconnect(wagmiDisconnect),
      })
    } else {
      // handle metamask wallet change - reset state
      setAccount(INIT_STATE)
    }
  }, [wagmiAccount.address])

  useEffect(() => {
    getNearWalletConnection().then((wallet) => {
      if (wallet.isSignedIn()) {
        setAccount({
          address: wallet.getAccountId(),
          disconnect: makeDisconnect(wallet.signOut),
        })
      }
    })
  }, [])

  return {
    ...account,
    openConnectModal,
  }
}

export default useHybridAccount
