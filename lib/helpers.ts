export function noOp() {}
export const classnames = (...cx: any[]) => cx.filter(Boolean).join(" ")
export const formatUndef = (v: any) => (v === undefined || v === "" ? null : v)
