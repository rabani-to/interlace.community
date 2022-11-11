import type { PropsWithChildren } from "react"

function ItemWithDescrition({
  description,
  children,
}: PropsWithChildren<{
  description: string
}>) {
  return (
    <div>
      {children}
      <p className="text-zinc-500 font-light text-sm pt-1">{description}</p>
    </div>
  )
}

export default ItemWithDescrition
