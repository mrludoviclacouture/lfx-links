import Head from 'next/head'
import { generateNextSeo } from 'next-seo/pages'
import seoData from '../next-seo.config'

export default function Seo({ page }) {
  const { title } = page
  return (
    <>
      <Head>
        {generateNextSeo({
          title: title,
          titleTemplate: seoData.openGraph.title,
          defaultTitle: seoData.openGraph.title,
          description: seoData.openGraph.description,
          canonical: seoData.openGraph.url,
          openGraph: {
            type: 'website',
            url: `${seoData.openGraph.url}`,
            title: `${title}`,
            description: `${seoData.openGraph.description}`,
            locale: 'en_EN',
            images: [
              {
                width: 1200,
                height: 630,
                url: `${seoData.openGraph.images[0].url}`,
                alt: `${title}`
              }
            ],
            site_name: 'litflowx.com'
          },
          additionalMetaTags: [
            {
              name: 'keywords',
              content: `${seoData.openGraph.keywords}`
            },
            {
              httpEquiv: 'x-ua-compatible',
              content: 'IE=edge; chrome=1'
            }
          ],
          robotsProps: {
            nosnippet: false,
            notranslate: true,
            noimageindex: false,
            noarchive: false,
            maxSnippet: -1,
            maxImagePreview: 'large',
            maxVideoPreview: -1
          }
        })}
      </Head>
    </>
  )
}
