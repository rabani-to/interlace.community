import type { PrimitiveFormItemType } from "./PrimitiveFormItem"
import Input from "./Input"

function InputNumber(props: PrimitiveFormItemType) {
  return <Input {...props} type="number" step=".1" min="1" />
}
export default InputNumber
