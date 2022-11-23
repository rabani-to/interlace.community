import { type PropsWithChildren } from "react"

export function RowItemIcon({
  children,
  Icon,
}: PropsWithChildren<{ Icon: any }>) {
  return (
    <Row>
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
}: PropsWithChildren<{
  className?: string
  items?: string
  gap?: string
}>) {
  return <div className={`${className} ${items} ${gap} flex`}>{children}</div>
}

export default Row
