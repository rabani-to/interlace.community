import { Details, Experience, Preferences } from "@/types/shared"
import {
  type PropsWithChildren,
  useState,
  createContext,
  useContext,
} from "react"

type OnboardingContextType = {
  details?: Details
  experience?: Experience
  preferences?: Preferences
  setStepData<T extends "details" | "experience" | "preferences">(
    stepName: T,
    data: T extends "details"
      ? Details
      : T extends "experience"
      ? Experience
      : Preferences
  ): void
}

const OnboardingContext = createContext({} as OnboardingContextType)

export const useOnboardingContext = () => useContext(OnboardingContext)

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState({} as OnboardingContextType)
  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        setStepData(stepName, data) {
          setState((state) => ({
            ...state,
            [stepName]: data,
          }))
        },
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export default OnboardingContext
