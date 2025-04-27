"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Book, User, Tag, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getBookDetails } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import type { Book as BookType } from "@/lib/api"

export default function BookDetail() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isUser } = useAuth()
  const bookId = searchParams.get("book_id")

  const [book, setBook] = useState<BookType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBookDetail() {
      if (!bookId) {
        setError("ID sách không hợp lệ")
        setLoading(false)
        return
      }

      try {
        const bookData = await getBookDetails(Number.parseInt(bookId))
        if (bookData) {
          setBook(bookData)
        } else {
          setError("Không tìm thấy sách")
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin sách:", err)
        setError("Đã xảy ra lỗi khi tải thông tin sách")
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetail()
  }, [bookId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">
          {error || "Không thể tải thông tin sách"}
        </div>
        <div className="mt-4">
          <Link href="/" className="text-yellow-500 hover:text-yellow-400 flex items-center gap-2">
            <ArrowLeft size={16} />
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-yellow-500 hover:text-yellow-400 flex items-center gap-2">
          <ArrowLeft size={16} />
          Quay lại trang chủ
        </Link>
      </div>

      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            <div className="relative h-80 w-full">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt={book.title}
                fill
                className="object-contain rounded-md"
              />
            </div>

            {isUser() && (
              <div className="mt-6">
                <Link
                  href={`/read?book_id=${book.book_id}`}
                  className="block w-full bg-yellow-500 hover:bg-yellow-600 text-black text-center font-medium py-3 px-4 rounded-md transition-colors duration-200"
                >
                  Đọc Sách
                </Link>
              </div>
            )}

            <div className="mt-4">
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#252525] hover:bg-[#333] text-white text-center font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                Xem URL Sách
              </a>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>

            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <User size={16} />
              <span>{book.author}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Tag size={16} className="text-yellow-500" />
                Thể loại
              </h2>
              <div className="flex flex-wrap gap-2">
                {book.genre.map((genre, index) => (
                  <span key={index} className="px-3 py-1 bg-[#252525] rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Book size={16} className="text-yellow-500" />
                Thông tin sách
              </h2>
              <div className="bg-[#252525] p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400">ID Sách</p>
                    <p>{book.book_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Tác giả</p>
                    <p>{book.author}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
