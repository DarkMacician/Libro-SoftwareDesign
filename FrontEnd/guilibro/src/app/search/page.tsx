"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Book } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { searchBooks } from "@/lib/api"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const searchTitle = searchParams.get("title") || ""
  const { isUser } = useAuth()

  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTitle) {
        setBooks([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const results = await searchBooks(searchTitle)
        setBooks(results)
      } catch (err) {
        console.error("Search error:", err)
        setError(err instanceof Error ? err.message : "Failed to load search results")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [searchTitle])

  return (
    <div className="px-6 py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm bg-[#1c2438]/50 hover:bg-[#1c2438] text-center rounded-lg transition-all duration-300 border border-[#334155] hover:border-[#6d28d9]">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold mt-4 text-white">
          Search Results for: <span className="bg-gradient-to-r from-[#6d28d9] to-[#f472b6] bg-clip-text text-transparent">{searchTitle}</span>
        </h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#1c2438] rounded-lg overflow-hidden animate-pulse border border-[#334155]">
              <div className="h-64 bg-[#252525]"></div>
              <div className="p-4">
                <div className="h-4 bg-[#252525] rounded mb-2"></div>
                <div className="h-3 bg-[#252525] rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-[#252525] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-[#1c2438]/30 border border-red-800 text-red-300 p-4 rounded-lg">{error}</div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No books found matching "{searchTitle}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.book_id} className="bg-[#1c2438] rounded-lg overflow-hidden border border-[#334155]">
              <div className="h-64 relative">
                <Image src="/placeholder.svg?height=400&width=300" alt={book.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 text-white">{book.title}</h3>
                <p className="text-gray-400 mb-2">{book.author}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {book.genre.slice(0, 2).map((g, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#252525] rounded-full text-xs text-gray-300">
                      {g}
                    </span>
                  ))}
                  {book.genre.length > 2 && (
                    <span className="px-2 py-0.5 bg-[#252525] rounded-full text-xs text-gray-300">+{book.genre.length - 2}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/view-detail?book_id=${book.book_id}`}
                    className="flex-1 bg-[#1c2438]/50 hover:bg-[#1c2438] text-white text-center font-medium py-2 rounded-lg transition-all duration-300 border border-[#334155] hover:border-[#6d28d9]"
                  >
                    Details
                  </Link>
                  {isUser() && (
                    <Link
                      href={`/read?book_id=${book.book_id}`}
                      className="flex-1 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white text-center font-medium py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6d28d9]/20 hover:scale-[1.02]"
                    >
                      Read
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
