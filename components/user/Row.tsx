import { type PropsWithChildren } from "react"
import type { PropsWithChildrenCx } from "@/types/shared"

export function RowItemIcon({
  children,
  Icon,
  title,
}: PropsWithChildren<{ Icon: any; title?: string }>) {
  return (
    <Row title={title}>
      <span className="bg-[#2924FF] rounded-full flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8">
        <Icon className="text-white" />
      </span>
      <span className="whitespace-nowrap">{children}</span>
    </Row>
  )
}

function Row({
  children,
  className,
  gap = "space-x-2",
  items = "items-center",
  title,
}: PropsWithChildrenCx<{
  items?: string
  gap?: string
  title?: string
}>) {
  return (
    <div
      title={title}
      className={`${title && "cursor-help"} ${className} ${items} ${gap} flex`}
    >
      {children}
    </div>
  )
}

export default Row
