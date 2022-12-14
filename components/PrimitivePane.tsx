import { Fragment, PropsWithChildren } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { classnames, noOp } from "@/lib/helpers"

export type DialogProps = PropsWithChildren<{
  show?: boolean
  onClose?(): void
  className?: string
  maxWidth?: string
  closeOnBackdropClick?: boolean
  background?: string
}>

function PrimitivePane({
  children,
  show = false,
  onClose = noOp,
  maxWidth = "md:max-w-lg",
  background = "bg-darker",
  closeOnBackdropClick = true,
  className,
}: DialogProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[200]"
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
          <div className="fixed top-0 w-screen h-screen left-0 bg-black/70" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-x-1/2"
          enterTo="opacity-100 translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classnames(
              "fixed top-0 w-screen h-screen left-0 flex items-start justify-end",
              className
            )}
          >
            <div className="relative">
              <CloseButton onClose={onClose} />
              <Dialog.Panel
                className={classnames(
                  maxWidth,
                  background,
                  "overflow-y-auto",
                  "flex flex-col w-screen h-screen transform py-6 px-8 text-left align-middle shadow-xl transition-all"
                )}
              >
                {children}
              </Dialog.Panel>
              <div className="w-full pointer-events-none absolute bottom-0 h-8 bg-gradient-to-b from-transparent via-[rgba(255,255,255,.25)] to-white"></div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export function CloseButton({ onClose }: { onClose(): void }) {
  return (
    <button
      onClick={onClose}
      className={classnames(
        "outline-none text-[currentColor] focus:text-opacity-70 hover:text-opacity-80",
        "absolute p-4 flex items-center justify-center top-0 right-0 mt-2 mr-4 z-10",
        "transition-transform duration-150 hover:scale-105 active:scale-95"
      )}
    >
      <svg
        className="pointer-events-none"
        fill="none"
        width="10"
        height="10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L3.58579 5L0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683417 10.0976 1.31658 10.0976 1.70711 9.70711L5 6.41421L8.29289 9.70711C8.68342 10.0976 9.31658 10.0976 9.70711 9.70711C10.0976 9.31658 10.0976 8.68342 9.70711 8.29289L6.41421 5L9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L5 3.58579L1.70711 0.292893Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

export default PrimitivePane
