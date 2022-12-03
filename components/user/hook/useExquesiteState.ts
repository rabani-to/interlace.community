import { useEffect, useState } from "react"

/**
 * This hook will reset `initState` whenever it changes.
 * @param resetOnDeps reset state to `initState` whenver deps change
 */
function useExquesiteState<InitState>(
  initState: InitState,
  {
    resetOnDeps,
    onMutateFormatter = (state) => state,
  }: {
    resetOnDeps?: any[]
    onMutateFormatter?(newState: InitState): InitState
  }
) {
  const [state, setState] = useState(initState)

  useEffect(() => {
    setState(onMutateFormatter(initState))
  }, [initState, resetOnDeps])

  return [state, setState] as const
}

export default useExquesiteState
