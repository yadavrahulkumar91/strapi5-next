import Image from 'next/image'
import Book from './book/book.js'
import Section from './components/Section.js'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <p>This is my next app for strapi5.</p>
    <Book/>
    <Section/>
    </main>
  )
}
