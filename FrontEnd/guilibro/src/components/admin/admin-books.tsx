"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { PlusCircle, Trash2, Edit, RefreshCw, Info } from "lucide-react"
import { type Book, getAllBooks, deleteBook } from "@/lib/api"

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getAllBooks()
      setBooks(data)
    } catch (err) {
      setError("Không thể tải danh sách sách. Vui lòng thử lại.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBook = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
      setIsLoading(true)
      const success = await deleteBook(id)

      if (success) {
        setBooks(books.filter((book) => book.book_id !== id))
        alert("Xóa sách thành công!")
      } else {
        alert("Không thể xóa sách. Vui lòng thử lại.")
      }
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-500">Quản Lý Sách</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-[#252525] text-white px-4 py-2 rounded-md">
              <RefreshCw className="h-5 w-5 animate-spin" />
              Đang tải...
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-lg overflow-hidden animate-pulse">
              <div className="h-64 bg-gray-800"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-3 bg-gray-800 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-500">Quản Lý Sách</h2>
          <button
            onClick={fetchBooks}
            className="flex items-center gap-2 bg-[#252525] hover:bg-[#333] text-white px-4 py-2 rounded-md transition-colors">
            <RefreshCw className="h-5 w-5" />
            Tải lại
          </button>
        </div>
        <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">{error}</div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500">Quản Lý Sách</h2>
        <div className="flex gap-2">
          <Link
            href="/admin/books/add"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Thêm Sách Mới
          </Link>
          <button
            onClick={fetchBooks}
            className="flex items-center gap-2 bg-[#252525] hover:bg-[#333] text-white px-4 py-2 rounded-md transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Tải lại
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.book_id} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
            <div className="h-64 relative">
              <Image src="/placeholder.svg?height=400&width=300" alt={book.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{book.title}</h3>
              <p className="text-gray-400 mb-2">{book.author}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {book.genre.slice(0, 2).map((g, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#252525] rounded-full text-xs">
                    {g}
                  </span>
                ))}
                {book.genre.length > 2 && (
                  <span className="px-2 py-0.5 bg-[#252525] rounded-full text-xs">+{book.genre.length - 2}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/view-detail?book_id=${book.book_id}`}
                  className="flex items-center justify-center gap-1 bg-[#252525] hover:bg-[#333] text-white text-center font-medium py-2 rounded transition-colors duration-200"
                >
                  <Info className="h-4 w-4" />
                  Chi tiết
                </Link>

                <button
                  onClick={() => handleDeleteBook(book.book_id)}
                  className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white text-center font-medium py-2 rounded transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
