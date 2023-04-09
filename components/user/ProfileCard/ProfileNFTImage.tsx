import { Fragment } from "react"
import { MdEdit } from "react-icons/md"

import useOnOffMachine from "@/lib/hooks/useOnOffMachine"
import PrimitiveDialog from "@/components/PrimitiveModal"

function ProfileNFTImage() {
  const machine = useOnOffMachine()

  return (
    <Fragment>
      <button
        onClick={machine.turnOn}
        className="bg-white/5 hover:bg-white/10 group flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-lg"
      >
        <MdEdit className="text-2xl text-white" />
      </button>
      <PrimitiveDialog
        noTexture
        padding="py-2 px-1"
        className="text-darker"
        background="bg-white"
        onClose={machine.turnOff}
        show={machine.isOn}
      >
        <section className="p-4">
          <h3 className="mb-4">Update your profile picture</h3>
          <p className="py-6 text-darker/80 text-center">
            Sorry, something wrong happened... 😥
          </p>
        </section>
      </PrimitiveDialog>
    </Fragment>
  )
}

function ImageItem() {
  return (
    <div className="w-1/4 h-[6rem] p-1">
      <figure className="relative w-full h-full overflow-hidden">
        <img
          className="absolute object-cover w-full h-full"
          alt=""
          src="https://cryptoslate.com/wp-content/themes/cryptoslate-2020/imgresize/timthumb.php?src=https://cryptoslate.com/wp-content/uploads/2023/03/cz-binance.jpg&w=1200&h=630&q=75"
        />
      </figure>
    </div>
  )
}

export default ProfileNFTImage
