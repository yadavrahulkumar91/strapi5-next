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
        
        {/* <script type="text/javascript" id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
        </script> */}
      </head>

      <body className={inter.className}>
        <Header />
        {children}
        

        <Footer/>
        
        </body>
    </html>
    </>
  )
}
