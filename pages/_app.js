import { useState, useEffect } from 'react'
import useDarkMode from 'use-dark-mode'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import Layout from '../app/layout'
import GlobalStyle from '../app/global-style'
import { darkTheme, lightTheme } from '../app/theme.config'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { generateDefaultSeo } from 'next-seo/pages'
import SEO from '../next-seo.config'

function MyApp({ Component, pageProps }) {
  const darkMode = useDarkMode(false, { storageKey: null, onChange: null })
  const [isMounted, setIsMounted] = useState(false)

  // const [theme, setTheme] = useState(lightTheme)
  const theme = darkMode.value ? darkTheme : lightTheme

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <GoogleAnalytics />
      <ThemeProvider theme={theme}>
        <Head>
          <meta content='width=device-width, initial-scale=1' name='viewport' />
        </Head>
        <GlobalStyle />
        <Layout>
          {generateDefaultSeo({
            canonical: SEO.openGraph.url,
            ...SEO,
            additionalMetaTags: [
              {
                name: 'keywords',
                content: SEO.openGraph.keywords
              },
              {
                httpEquiv: 'x-ua-compatible',
                content: 'IE=edge; chrome=1'
              }
            ]
          })}
          {isMounted && <Component {...pageProps} />}
        </Layout>
      </ThemeProvider>
    </>
  )
}
export default MyApp
