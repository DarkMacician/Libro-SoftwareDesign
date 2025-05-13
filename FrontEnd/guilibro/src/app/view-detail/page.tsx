"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Book, User, Tag, ExternalLink, Bookmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getBookDetails, getBookmark } from "@/lib/api"
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
  const [bookmarkPage, setBookmarkPage] = useState<number | null>(null)

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

  useEffect(() => {
    async function fetchBookmark() {
      if (book && isUser()) {
        const bookmark = await getBookmark(book.book_id)
        setBookmarkPage(bookmark)
      }
    }

    fetchBookmark()
  }, [book])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-[60vh]">
          <div          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-900/30 backdrop-blur-sm border border-red-800 text-red-300 p-6 rounded-lg shadow-xl">
            {error || "Không thể tải thông tin sách"}
          </div>
          <div className="mt-6">
            <Link href="/" className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại trang chủ</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm flex-1 bg-[#1c2438]/50 hover:bg-[#1c2438]text-center 
                        rounded-lg transition-all duration-300 border border-[#334155]
                      hover:border-[#6d28d9]">
          <ArrowLeft size={16} />
          Quay lại trang chủ
        </Link>
      </div>

      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800/50 shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3 p-8 border-r border-gray-800/50">
            <div className="relative h-96 w-full group">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt={book.title}
                fill
                className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>

            {isUser() && (
              <div className="mt-8 space-y-4">
                <Link
                  href={`/read?book_id=${book.book_id}`}
                  className="flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg custom-button"
                >
                  Đọc Sách
                </Link>

                {bookmarkPage && (
                  <Link
                    href={`/read?book_id=${book.book_id}&page=${bookmarkPage}`}
                    className="flex custom-button items-center justify-center w-full px-6 py-3 text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-800 rounded-xl backdrop-blur-sm transition-all duration-200 transform hover:scale-[1.02] gap-2"
                  >
                    <Bookmark size={16} className="text-yellow-500" />
                    Tiếp tục đọc trang {bookmarkPage}
                  </Link>
                )}
              </div>
            )}

            {/* <div className="mt-4">
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-800 rounded-xl backdrop-blur-sm transition-all duration-200 transform hover:scale-[1.02] gap-2"
              >
                <ExternalLink size={16} className="text-yellow-500" />
                Xem URL Sách
              </a>
            </div> */}
          </div>

          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r text-white bg-clip-text">
              {book.title}
            </h1>

            <div className="flex items-center gap-3 mb-6 text-gray-400 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <User size={16} className="text-white" />
              <span className="text-sm font-medium">{book.author}</span>
            </div>

            <div className="mb-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                  <Tag size={16} className="text-white" />
                  Thể loại
                </h2>
                <div className="flex flex-wrap gap-2">
                  {book.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-gray-800/50 text-gray-300 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-gray-800 transition-colors duration-200"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                  <Book size={16} className="text-white" />
                  Thông tin sách
                </h2>
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-1">ID Sách</p>
                      <p className="text-gray-200">{book.book_id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-1">Tác giả</p>
                      <p className="text-gray-200">{book.author}</p>
                    </div>
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
