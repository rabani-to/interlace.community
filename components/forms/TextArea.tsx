import PrimitiveFormItem, {
  type PrimitiveFormItemType,
} from "./PrimitiveFormItem"

function TextArea({ ...props }: PrimitiveFormItemType) {
  return <PrimitiveFormItem {...props} primitiveElement="textarea" rows={4} />
}

export default TextArea
