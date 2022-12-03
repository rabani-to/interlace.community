import { FLAG_SELECT_IS_MULTI } from "@/components/forms/ReactSelect"
import { utils } from "ethers"

export function noOp() {}
export const classnames = (...cx: any[]) => cx.filter(Boolean).join(" ")
export const formatUndef = (v: any) => (v === undefined || v === "" ? null : v)
export const beautifyAddress = (addr: string) =>
  `${addr.substr(0, 4)}${addr.substr(-5, 5)}`

export const makeInterLaceSigMessageId = (message: string) => {
  const messageId = utils.id(message)
  return {
    message: `InterLace Signature Request.\nConfirm profile update/creation for messageId: ${messageId}`,
    messageId,
  }
}

export const jsonifyFormValues = <T = any>(form: HTMLFormElement): T => {
  const data = {} as { [name: string]: string | string[] }
  const ATTR_IS_MULTI = "data-is-multi"
  form
    .querySelectorAll(`[data-flag="${FLAG_SELECT_IS_MULTI}"]`)
    .forEach((inputWrapper) => {
      /**
       * We look for ReactSelect components with multi selection
       * @see https://github.com/rabani-to/interlace.community/blob/master/components/forms/ReactSelect.tsx
       */
      inputWrapper
        .querySelectorAll("input[name][type='hidden']")
        .forEach((input) => {
          // set isMulti to those multi select inputs
          input.setAttribute(ATTR_IS_MULTI, ATTR_IS_MULTI)
        })
    })

  // After isMulti elements get "formatted" we an take on every element within form
  form
    .querySelectorAll<HTMLInputElement>("input[name], textarea[name]")
    .forEach((input) => {
      const { value, name } = input
      if (input.getAttribute(ATTR_IS_MULTI) === ATTR_IS_MULTI) {
        const storedValue = data[name]
        data[name] = Array.isArray(storedValue)
          ? [...storedValue, value]
          : [value]
      } else {
        data[name] = value
      }
    })

  return data as any
}
