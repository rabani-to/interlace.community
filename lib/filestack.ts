import * as filestack from "filestack-js"
export const filestackClient = filestack.init(
  process.env.NEXT_PUBLIC_FILESTACK_API
)
