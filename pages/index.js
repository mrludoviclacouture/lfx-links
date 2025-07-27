import Seo from '../app/seo'
import WebLinks from '../app/web-links'
import seoData from '../next-seo.config'

export default function Home() {
  const page = {
    title: seoData.openGraph.title,
    excerpt: 'home',
    slug: '/',
    coverImage: 'https://vjy.me/preview.jpg'
  }

  return (
    <>
      <Seo page={page} />
      <WebLinks />
    </>
  )
}
