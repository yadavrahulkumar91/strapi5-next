import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'

import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GameChanger Academy',
  description: 'Change the game of your field',
}

export default function RootLayout({ children }) {

  return (
    <>
      <html lang="en">
        <head>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5809329897020514"
            crossorigin="anonymous"></script>

          <meta name="application-name" content="GameChanger Academy" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="GameChanger Academy" />
          <meta name="description" content="Best Academy App in the world" />
          <meta name="format-detection" content="telephone=98098305830" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://rahulkumaryadav.com.np" />
          <meta name="twitter:title" content="GameChanger Academy" />
          <meta name="twitter:description" content="Best academy App in the world" />
          <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="GameChanger Academy" />
          <meta property="og:description" content="Best academy App in the world" />
          <meta property="og:site_name" content="GameChanger Academy" />
          <meta property="og:url" content="https://rahulkumaryadav.com.np" />
          <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />

          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />
        </head>

        <body className={inter.className}>
          <Header />
          {children}


          <Footer />

        </body>
      </html>
    </>
  )
}
