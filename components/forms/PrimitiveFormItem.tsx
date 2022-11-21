import type { ReactNode } from "react"
import { classnames, noOp } from "@/lib/helpers"

export type PrimitiveFormItemType = Partial<
  HTMLInputElement & HTMLTextAreaElement
> & {
  startEnhancer?: ReactNode
  endEnhancer?: ReactNode
  label: string
  labelTextColor?: string
  className?: string
  onChange?(text: string): void
}

function PrimitiveFormItem({
  label,
  startEnhancer,
  endEnhancer,
  primitiveElement,
  onChange = noOp,
  labelTextColor = "text-zinc-700",
  className,
  ...inputProps
}: PrimitiveFormItemType & {
  primitiveElement?: string
}) {
  const Element = primitiveElement as any
  return (
    <label className="py-2 text-left">
      <span className={labelTextColor}>{label}</span>
      <div
        className={classnames(
          className,
          inputProps.readOnly || "hover:border-violet-400 focus-within:ring-2",
          "flex w-full overflow-hidden items-center border rounded-lg mt-2 ring-violet-300 transition-all duration-75"
        )}
      >
        {startEnhancer && <div className="p-2 border-r">{startEnhancer}</div>}
        <Element
          {...(inputProps as any)}
          onChange={({ target }: any) => onChange(target.value)}
          className="placeholder:font-light outline-none flex-grow p-2 bg-transparent"
        />
        {endEnhancer && <div className="p-2 border-l">{endEnhancer}</div>}
      </div>
    </label>
  )
}
export default PrimitiveFormItem
