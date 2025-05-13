"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { type Book, getAllBooks } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { Book as BookIcon } from "lucide-react"

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
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookIcon className="w-6 h-6 text-[#6d28d9]" />
          <span className="bg-gradient-to-r from-[#6d28d9] to-[#f472b6] bg-clip-text text-transparent">
             Books
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-effect rounded-xl overflow-hidden animate-pulse">
              <div className="h-64 bg-[#1c2438]/50"></div>
              <div className="p-4">
                <div className="h-4 bg-[#1c2438]/50 rounded mb-2"></div>
                <div className="h-3 bg-[#1c2438]/50 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-[#1c2438]/50 rounded"></div>
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
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookIcon className="w-6 h-6 text-[#6d28d9]" />
          <span className="bg-gradient-to-r from-[#6d28d9] to-[#f472b6] bg-clip-text text-transparent">
             Books
          </span>
        </h2>
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl backdrop-blur-sm">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookIcon className="w-6 h-6 text-[#6d28d9]" />
        <span className="bg-gradient-to-r from-[#6d28d9] to-[#f472b6] bg-clip-text text-transparent">
           Books
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.book_id} className="group relative">
            {/* Card with glass effect */}
            <div className="glass-effect rounded-xl overflow-hidden transform transition-all duration-500 
              hover:scale-[1.02] hover:shadow-xl hover:shadow-[#6d28d9]/20 min-h-[450px]">
              
              {/* Image container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3 min-h-[200px] flex flex-col justify-between">
                <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-gradient-to-r 
                  group-hover:from-[#6d28d9] group-hover:to-[#f472b6] group-hover:bg-clip-text 
                  transition-all duration-300 line-clamp-1">
                  {book.title}
                </h3>
                
                <p className="text-[#94a3b8] text-sm">{book.author}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {book.genre.slice(0, 2).map((g, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-[#1c2438]/50 text-[#94a3b8]
                      border border-[#334155] backdrop-blur-sm">
                      {g}
                    </span>
                  ))}
                  {book.genre.length > 2 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#1c2438]/50 text-[#94a3b8]
                      border border-[#334155] backdrop-blur-sm">
                      +{book.genre.length - 2}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto pt-2">
                  <Link
                    href={`/view-detail?book_id=${book.book_id}`}
                    className="flex-1 bg-[#1c2438]/50 hover:bg-[#1c2438] text-white text-center 
                      font-medium py-2 rounded-lg transition-all duration-300 border border-[#334155]
                      hover:border-[#6d28d9]"
                  >
                    Chi tiết
                  </Link>
                  {isUser() && (
                    <Link
                      href={`/read?book_id=${book.book_id}`}
                      className="flex-1 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white 
                        text-center font-medium py-2 rounded-lg transition-all duration-300
                        hover:shadow-lg hover:shadow-[#6d28d9]/20 hover:scale-[1.02]"
                    >
                      Đọc Sách
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
