import type { ProfileWithShort } from "@/types/shared"
import type { RedisResponse } from "@/lib/redis"
import { useLayoutEffect, useState } from "react"
import ff from "@/lib/services/ff"
import { noOp } from "@/lib/helpers"

function useRemoteProfileData(shortIdOrAddress: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [state, setState] = useState<RedisResponse<ProfileWithShort>>({} as any)
  const revalidate = () => setCount((n) => n + 1)

  useLayoutEffect(() => {
    if (shortIdOrAddress) {
      ff.get<RedisResponse<ProfileWithShort>>(["/profile", shortIdOrAddress])
        .then((response) => {
          if (response.isOk) {
            setState(response)
          }
        })
        .catch(noOp)
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [shortIdOrAddress, count])

  return {
    ...state,
    revalidate,
    isLoading,
  } as typeof state & {
    revalidate(): void
    isLoading: boolean
  }
}

export default useRemoteProfileData
