import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import Link from "next/link"

function Button({
  className,
  fontSize,
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
  } & ButtonHTMLAttributes<{}>
>) {
  const Wrapper = (isLink ? Link : "button") as any
  return (
    <Wrapper
      {...props}
      className={`${className} ${
        fontSize || "text-xl"
      } flex items-center space-x-1 px-4 py-3 rounded-lg`}
    >
      {children}
    </Wrapper>
  )
}

export default Button
