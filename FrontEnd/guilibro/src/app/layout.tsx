import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Header from "@/components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookWeb - Discover Your Next Great Read",
  description: "Explore thousands of books from contemporary bestsellers to timeless classics.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-white`}>
        <div className="flex min-h-screen">
          
          <div className="flex-1">
            
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
