import { type PropsWithChildren } from "react"
import { MdEdit } from "react-icons/md"
import Row from "./Row"

function ProfileSection({
  title,
  children,
  icon,
  onEdit,
}: PropsWithChildren<{
  title: string
  icon: any
  onEdit?: () => void
}>) {
  return (
    <Row className="flex-col lg:flex-row" gap="gap-4" items="items-start">
      <span className="bg-[#2924FF] rounded-full flex items-center justify-center h-12 min-w-[3rem]">
        {icon}
      </span>
      <section>
        <div className="flex gap-4 items-center lg:pt-2">
          <h4 className="font-bold text-2xl">{title}</h4>
          <button
            onClick={onEdit}
            className="flex group gap-1 opacity-60 hover:opacity-100"
          >
            <MdEdit className="text-xl" />
            <span className="md:hidden group-hover:inline text-sm">Edit</span>
          </button>
        </div>
        {children}
      </section>
    </Row>
  )
}

export default ProfileSection
