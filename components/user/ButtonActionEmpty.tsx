import { PropsWithChildrenCx } from "@/types/shared"
import { BsPlusLg } from "react-icons/bs"
import Button from "@/components/Button"

function ButtonActionEmpty({
  onClick,
  children,
  className,
}: PropsWithChildrenCx<{
  onClick(): void
}>) {
  return (
    <Button
      onClick={onClick}
      className={`${className} flex items-center gap-2 bg-white/5 !text-base`}
    >
      <span>{children}</span>
      <BsPlusLg className="text-white text-xs" />
    </Button>
  )
}

export default ButtonActionEmpty
