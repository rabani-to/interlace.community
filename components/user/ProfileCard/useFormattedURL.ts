import { useMemo } from "react"

function useFormattedURL(rawURL?: string) {
  const formattedURL = useMemo(() => {
    const url = {
      plainText: "",
      url: "#",
      isValid: false,
    }
    try {
      if (rawURL) {
        const { origin, href } = new URL(
          rawURL.includes("://") ? rawURL : `https://${rawURL}`
        )
        url.isValid = true
        url.plainText = origin
        url.url = href
      }
    } catch (_) {
      // if error mark url as invalid
      url.plainText = "Invalid"
    }
    return url
  }, [rawURL])

  return formattedURL
}

export default useFormattedURL
