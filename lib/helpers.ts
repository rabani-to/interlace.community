export function noOp() {}
export const classnames = (...cx: any[]) => cx.filter(Boolean).join(" ")
export const formatUndef = (v: any) => (v === undefined || v === "" ? null : v)
export const beautifyAddress = (addr: string) =>
  `${addr.substr(0, 4)}${addr.substr(-5, 5)}`
