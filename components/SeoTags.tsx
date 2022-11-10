import { NextSeo } from "next-seo"

const DEV_URL = "https://interlace-community.vercel.app"
const URL = "https://interlace.community"
const TWITTER_HANDLE = "Interlacehq"
export const DEFAULT_CONFIG = {
  title: "Interlace | Web3 Contributor Marketplace",
  url: URL,
  seoURL: `${DEV_URL}/seo.png`,
  description:
    "⛓️ Build your on-chain reputation as a contributor. 🤝 Work with pre-vetted contributors as a DAO.",
}

function SeoTags(props: Partial<typeof DEFAULT_CONFIG>) {
  const SEO = { ...DEFAULT_CONFIG, ...props }
  return (
    <NextSeo
      title={SEO.title}
      additionalLinkTags={[
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ]}
      twitter={{
        cardType: "summary_large_image",
        handle: TWITTER_HANDLE,
        site: SEO.url,
      }}
      openGraph={{
        type: "website",
        url: SEO.url,
        title: SEO.title,
        description: SEO.description,
        images: [
          {
            url: SEO.seoURL,
            alt: SEO.seoURL,
            width: 1000, // 1200,
            height: 1000, // 630,
          },
        ],
      }}
      description={SEO.description}
    />
  )
}

export default SeoTags
