import type { ProfileWithShort } from "@/types/shared"
import type { RedisResponse } from "@/lib/redis"

import { useEffect, useState } from "react"
import ff from "@/lib/services/ff"
import { noOp } from "@/lib/helpers"

function useRemoteProfileData(shortIdOrAddress: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [profile, setProfile] = useState<
    RedisResponse<ProfileWithShort | null>
  >({} as any)

  const revalidate = () => setCount((n) => n + 1)

  useEffect(() => {
    if (shortIdOrAddress) {
      ff.get<RedisResponse<ProfileWithShort>>(["/profile", shortIdOrAddress])
        .then(setProfile)
        .catch(noOp)
        .finally(() => {
          setIsLoading(false)
        })
    } else setProfile({} as any)
  }, [shortIdOrAddress, count])

  return {
    ...profile,
    revalidate,
    isLoading,
  } as typeof profile & {
    revalidate(): void
    isLoading: boolean
  }
}

export default useRemoteProfileData
