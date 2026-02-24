import Header from "@/components/Header";
import {Lato} from 'next/font/google'
import '../globals.css'
import Footer from "@/components/Footer";
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'LinkTri Clone',
  description: 'Share your links, social profiles, contact info and more on one page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className + " bg-slate-950 text-slate-50"}>
        <main className="min-h-screen flex flex-col">
          <Header />
          <div className="max-w-6xl mx-auto p-6 flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
