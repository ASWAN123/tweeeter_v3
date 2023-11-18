import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar'
import SessionProvider from './compoenents/SessionProvider'
import  {  getServerSession } from "next-auth"
import { authOptions } from './api/auth/[...nextauth]'




const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tweeter',
  description: 'Tweeter social app',
}

export default  async function  RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  const session = await getServerSession(authOptions)


  return (
    <html lang="en">
      <body className={ `${inter.className} w-3xl`}>
      <SessionProvider session={session}>
        <Navbar />
        {children}
        </SessionProvider>
        </body>

    </html>
  )
}
