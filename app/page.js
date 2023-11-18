import Image from 'next/image'
import Book from './book/[slug]/page.js'
import Section from './components/Section.js'
// import Book3 from './components/Book3.js'
// import Page1 from './utils/page1.js'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
    <p>This is my next app for strapi5.</p>
    <Section/>
    {/* <Book/> */}
    {/* <Book3/> */}
    {/* <Page1/> */}
    </main>
  )
}
