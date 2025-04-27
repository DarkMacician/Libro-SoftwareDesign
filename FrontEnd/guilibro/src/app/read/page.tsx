"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Bookmark, Check } from "lucide-react"
import Link from "next/link"
import { getBookDetails, bookmarkPage } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/protected-route"
import type { Book } from "@/lib/api"

export default function ReadBook() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getToken } = useAuth()
  const bookId = searchParams.get("book_id")

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(20) // Giả định sách có 20 trang
  const [bookmarkSuccess, setBookmarkSuccess] = useState(false)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)

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
          // Trong thực tế, bạn có thể lấy số trang từ API
          setTotalPages(20)
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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleBookmark = async () => {
    if (!book) return

    setBookmarkLoading(true)
    try {
      const success = await bookmarkPage(book.book_id, currentPage)
      if (success) {
        setBookmarkSuccess(true)
        setTimeout(() => setBookmarkSuccess(false), 3000)
      } else {
        setError("Không thể đánh dấu trang")
        setTimeout(() => setError(null), 3000)
      }
    } catch (err) {
      console.error("Lỗi khi đánh dấu trang:", err)
      setError("Đã xảy ra lỗi khi đánh dấu trang")
      setTimeout(() => setError(null), 3000)
    } finally {
      setBookmarkLoading(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute requireUser>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error || !book) {
    return (
      <ProtectedRoute requireUser>
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
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requireUser>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link
            href={`/view-detail?book_id=${book.book_id}`}
            className="text-yellow-500 hover:text-yellow-400 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Quay lại chi tiết sách
          </Link>
          <h1 className="text-xl font-bold">{book.title}</h1>
        </div>

        {bookmarkSuccess && (
          <div className="mb-4 bg-green-900/30 border border-green-800 text-green-300 p-4 rounded-md flex items-center gap-2">
            <Check size={16} />
            Đã đánh dấu trang {currentPage}
          </div>
        )}

        {error && <div className="mb-4 bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">{error}</div>}

        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Trang {currentPage} / {totalPages}
            </div>
            <button
              onClick={handleBookmark}
              disabled={bookmarkLoading}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md transition-colors disabled:opacity-50"
            >
              <Bookmark size={16} />
              {bookmarkLoading ? "Đang lưu..." : "Đánh dấu trang"}
            </button>
          </div>

          <div className="min-h-[60vh] p-8 bg-[#252525] flex items-center justify-center">
            {/* Đây là nơi hiển thị nội dung sách. Trong thực tế, bạn sẽ tải nội dung từ URL */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
              <p className="text-gray-400 mb-6">Tác giả: {book.author}</p>
              <p className="mb-4">Đây là nội dung của trang {currentPage}</p>
              <p className="text-gray-500 italic">
                (Đây là nội dung mẫu. Trong ứng dụng thực tế, nội dung sách sẽ được tải từ URL: {book.url})
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800 flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
              className="flex items-center gap-2 bg-[#252525] hover:bg-[#333] text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              Trang trước
            </button>
            <div className="text-sm text-gray-400">
              Trang {currentPage} / {totalPages}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-2 bg-[#252525] hover:bg-[#333] text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trang sau
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
