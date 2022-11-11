import type { ReactNode } from "react"

export type PrimitiveFormItemType = Partial<
  HTMLInputElement & HTMLTextAreaElement
> & {
  startEnhancer?: ReactNode
  endEnhancer?: ReactNode
  label: string
}

function PrimitiveFormItem({
  label,
  startEnhancer,
  endEnhancer,
  primitiveElement,
  ...inputProps
}: PrimitiveFormItemType & {
  primitiveElement?: string
}) {
  const Element = primitiveElement as any
  return (
    <label className="py-2 text-left">
      <span className="text-zinc-700">{label}</span>
      <div className="flex w-full overflow-hidden items-center border hover:border-violet-400 rounded-lg mt-2 focus-within:ring-2 ring-violet-300 transition-all duration-75">
        {startEnhancer && <div className="p-2 border-r">{startEnhancer}</div>}
        <Element
          {...(inputProps as any)}
          className="placeholder:font-light outline-none flex-grow p-2"
        />
      </div>
    </label>
  )
}
export default PrimitiveFormItem
