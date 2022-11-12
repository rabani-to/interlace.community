import Select from "react-select"

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
]

function ReactSelect({
  label,
  placeholder,
  isMulti,
}: {
  placeholder?: string
  isMulti?: boolean
  label: string
}) {
  return (
    <label className="py-2 text-left">
      <span className="text-zinc-700 inline-block mb-2">{label}</span>
      <Select
        isMulti={isMulti}
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
        className="custom-react-selct text-left"
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
        options={options}
      />
    </label>
  )
}

export default ReactSelect
