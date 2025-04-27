"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { type Book, getAllBooks } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"

export default function RecommendedBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isUser } = useAuth()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks()
        setBooks(data.slice(0, 4)) // Get first 4 books
      } catch (err) {
        setError("Failed to load recommended books")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (isLoading) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Recommended Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Recommended Books</h2>
        <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">{error}</div>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-yellow-500">Recommended Books</h2>
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
              <div className="flex gap-2">
                <Link
                  href={`/view-detail?book_id=${book.book_id}`}
                  className="flex-1 bg-[#252525] hover:bg-[#333] text-white text-center font-medium py-2 rounded transition-colors duration-200"
                >
                  Chi tiết
                </Link>
                {isUser() && (
                  <Link
                    href={`/read?book_id=${book.book_id}`}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-center font-medium py-2 rounded transition-colors duration-200"
                  >
                    Đọc Sách
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
