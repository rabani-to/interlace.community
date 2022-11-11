import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import Link from "next/link"
import { classnames } from "@/lib/helpers"

function Button({
  className,
  fontSize,
  borderRadius,
  isFormItem,
  children,
  isLink,
  flavor,
  isFull,
  ...props
}: PropsWithChildren<
  {
    isLink?: boolean
    flavor?: "violet"
    isFull?: boolean
    isFormItem?: boolean
    target?: string
    href?: string
    /** Your tw text-[size] class */
    fontSize?: string
    /** Your tw rounded-[size] class */
    borderRadius?: string
  } & ButtonHTMLAttributes<{}>
>) {
  const Wrapper = (isLink ? Link : "button") as any

  return (
    <Wrapper
      {...props}
      className={classnames(
        className,
        isFormItem && "justify-center text-base font-bold",
        flavor === "violet" && "bg-violet-600 text-white",
        isFull && "w-full",
        isFormItem ? "" : fontSize || "text-xl",
        borderRadius || "rounded-lg",
        "group flex items-center space-x-1 px-4 py-3 transition-all",
        "hover:ring-2 hover:opacity-90 focus:ring-4 ring-white/5 active:scale-95"
      )}
    >
      {children}
    </Wrapper>
  )
}

export default Button
