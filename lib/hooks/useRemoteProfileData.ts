import type { Profile } from "@/types/shared"
import type { RedisResponse } from "@/lib/redis"
import { useLayoutEffect, useState } from "react"
import ff from "@/lib/services/ff"
import { noOp } from "@/lib/helpers"

function useRemoteProfileData(shortIdOrAddress: string) {
  const [count, setCount] = useState(0)
  const [state, setState] = useState<RedisResponse<Profile>>({} as any)

  useLayoutEffect(() => {
    if (shortIdOrAddress) {
      ff.get<RedisResponse<Profile>>(["/profile", shortIdOrAddress])
        .then((response) => {
          if (response.isOk) {
            setState(response)
          }
        })
        .catch(noOp)
    }
  }, [shortIdOrAddress, count])

  const revalidate = () => setCount((n) => n + 1)
  return {
    ...state,
    revalidate,
  } as typeof state & {
    revalidate(): void
  }
}

export default useRemoteProfileData
