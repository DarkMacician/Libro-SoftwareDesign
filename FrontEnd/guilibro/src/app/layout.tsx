import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sachweb.vn - Thư viện sách điện tử hàng đầu Việt Nam",
  description: "Sachweb.vn cung cấp hàng ngàn đầu sách điện tử chất lượng cao với nhiều thể loại đa dạng.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="font-sans">{children}</body>
    </html>
  )
}
