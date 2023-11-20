import Image from 'next/image'
import Book from './book/[slug]/page.js'
import Section from './components/Section.js'
import Header from './components/header'


export default function Home() {
 
  return (
    <>
      {/* <Header/> */}
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Section/>
  
    </main>
    </>
  )
}
