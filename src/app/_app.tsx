import { useEffect, useState } from 'react'
import Head from 'next/head'

import '../styles/global.scss'

function App({ Component, pageProps }) {
  // Configurações de acessibilidade (fontes e cores)
  const [contrast, setContrast] = useState(0)
  const [fontSize, setFontSize] = useState(0)

  useEffect(() => {
    localStorage.getItem('@contrast') != null
      ? setContrast(localStorage.getItem('@contrast'))
      : setContrast(0)
  }, [contrast])

  useEffect(() => {
    setFontSize(localStorage.getItem('@fontSize'))
    if (fontSize == 1) {
      document.querySelector('html').classList.add('font-large')
    } else {
      document.querySelector('html').classList.remove('font-large')
    }
  }, [fontSize])

  pageProps = {
    ...pageProps,
    contrast: setContrast,
    fontsize: setFontSize
  }

  return (
    <>
      <Head>
        {/* <link rel="icon" href="/img/favicon.ico" />
        <link rel="shortcut icon" href="/img/vercel.svg" />
        <link rel="apple-touch-icon" href="/img/vercel.svg" /> */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Sistema de Gerenciamento Óptico | Odin" />
        <meta name="description" content="Sistema de Gerenciamento Óptico" />
        <meta name="keywords" content="keywords necessárias para o projeto" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App