import { Fragment, PropsWithChildren } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { classnames, noOp } from "@/lib/helpers"
import { CloseButton } from "./PrimitivePane"

export type DialogProps = PropsWithChildren<{
  show?: boolean
  onClose?(): void
  className?: string
  maxWidth?: string
  closeOnBackdropClick?: boolean
  background?: string
  noTexture?: boolean
  justify?: string
  items?: string
  padding?: string
}>

function PrimitiveDialog({
  children,
  show = false,
  onClose = noOp,
  maxWidth = "max-w-lg",
  background = "bg-darker",
  items = "items-center",
  padding,
  justify = "justify-center",
  noTexture,
  closeOnBackdropClick = true,
  className,
}: DialogProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={closeOnBackdropClick ? onClose : noOp}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>
        <div
          className={classnames(
            justify,
            items,
            "fixed inset-0 flex",
            className
          )}
        >
          <div hidden={!show} className="relative">
            <CloseButton onClose={onClose} />
            <Dialog.Panel
              data-type={noTexture || "texture"}
              className={classnames(
                maxWidth,
                background,
                padding || "py-6 px-8",
                "w-screen transform rounded-2xl text-left shadow-xl transition-all max-h-screen"
              )}
            >
              {children}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PrimitiveDialog
