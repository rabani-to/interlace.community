import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import Link from "next/link"
import { classnames } from "@/lib/helpers"

function Button({
  className,
  fontSize,
  borderRadius,
  children,
  isLink,
  ...props
}: PropsWithChildren<
  {
    isLink?: boolean
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
        fontSize || "text-xl",
        borderRadius || "rounded-lg",
        "flex items-center space-x-1 px-4 py-3"
      )}
    >
      {children}
    </Wrapper>
  )
}

export default Button
