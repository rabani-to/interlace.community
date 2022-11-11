import PrimitiveFormItem, {
  type PrimitiveFormItemType,
} from "./PrimitiveFormItem"

function Input({ ...props }: PrimitiveFormItemType) {
  return <PrimitiveFormItem {...props} primitiveElement="input" rows={4} />
}

export default Input
