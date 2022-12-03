import { Fragment } from "react"

function ShowHideContentWrapper({
  children,
  title,
}: {
  title: string
  children: any
}) {
  if (children !== "") {
    return (
      <Fragment>
        <header className="mt-4">{title}</header>
        <p className="text-gray-400">{children}</p>
      </Fragment>
    )
  }
  return null
}

export default ShowHideContentWrapper
