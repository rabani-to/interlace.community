import { useState, useEffect } from "react"
import Select from "react-select"
import { noOp } from "@/lib/helpers"

/** NOTE: Used to flag multi select elements */
export const FLAG_SELECT_IS_MULTI = "flag.element.isMulti"
const arrify = (v: any) => (Array.isArray(v) ? v : [v])
const formatOptions = (arr: string[]) =>
  arr.map((value) => ({
    value,
    label: value,
  }))

function ReactSelect({
  label,
  placeholder,
  defaultValue,
  isMulti,
  required,
  name,
  options,
  onSelect = noOp,
}: {
  placeholder?: string
  name: string
  isMulti?: boolean
  label: string
  required?: boolean
  onSelect?(value: { value: string }[]): void
  defaultValue?: string | string[]
  options: string[]
}) {
  const [value, setValue] = useState<any>()
  const parsedOptions = formatOptions(options)
  const formattedDefaultValues = formatOptions(arrify(defaultValue))

  function handleOnChange(value: any) {
    onSelect(arrify(value))
    setValue(value)
  }

  useEffect(() => {
    const arrifiedDefaultValue = arrify(defaultValue)
    if (!defaultValue || options.includes(arrifiedDefaultValue[0])) return
    // User options changed after render. Force value reset
    setValue(null)
  }, [options])

  return (
    <label
      data-flag={isMulti && FLAG_SELECT_IS_MULTI}
      className="py-2 text-left"
    >
      <span className="text-zinc-700 inline-block mb-2">{label}</span>
      <Select
        name={name}
        value={value}
        onChange={handleOnChange}
        defaultValue={defaultValue ? formattedDefaultValues : undefined}
        required={required}
        isMulti={isMulti}
        options={parsedOptions}
        placeholder={placeholder}
        theme={(theme) => ({
          ...theme,
          borderRadius: 16,
          colors: {
            ...theme.colors,
            primary: "#7c3aed",
            primary25: "#f4f4f5",
            dangerLight: "#f4f4f5",
            neutral10: "#f4f4f5",
            danger: "black",
          },
        })}
        className="text-left"
        styles={{
          container: (currentStyle) => ({
            ...currentStyle,
          }),
          control: (currentStyle) => ({
            ...currentStyle,
            borderColor: "#e5e7eb",
            ":hover": {
              borderColor: "#e5e7eb",
            },
            borderRadius: "0.5rem",
            minHeight: "2.75rem",
          }),
          placeholder: (currentStyle) => ({
            ...currentStyle,
            color: "#9ca3af",
            fontWeight: 300,
          }),
          menuList: (currentStyle) => ({
            ...currentStyle,
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }),
          menu: (currentStyle) => ({
            ...currentStyle,
            borderRadius: "0.5rem",
          }),
        }}
      />
    </label>
  )
}

export default ReactSelect
