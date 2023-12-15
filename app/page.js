import Image from 'next/image'
import Book from './book/[slug]/page.js'
import Section from './components/Section.js'
import Header from './components/header'


export default function Home() {
 
  return (
    <>
    
    {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
    <main className="flex flex-col items-center justify-between align-center">
    <Section/>
  
    </main>
    {/* </main> */}
    </>
  )
}
