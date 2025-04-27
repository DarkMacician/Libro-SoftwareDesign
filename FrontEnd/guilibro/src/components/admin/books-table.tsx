"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Trash2, Search, RefreshCw } from "lucide-react"
import { type Book, getAllBooks, deleteBook } from "@/lib/api"

export default function BooksTable() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks()
  }, [])

  // Function to fetch books
  const fetchBooks = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getAllBooks()
      setBooks(data)
    } catch (err) {
      setError("Failed to load books. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Delete book handler
  const handleDeleteBook = async (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      const success = await deleteBook(id)

      if (success) {
        setBooks(books.filter((book) => book.book_id !== id))
      } else {
        alert("Failed to delete book. Please try again.")
      }
    }
  }

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div>
      <div className="flex items-center mb-4 gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 text-sm rounded-md bg-[#252525] border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={fetchBooks}
          className="p-2 rounded-md bg-[#252525] text-gray-400 hover:text-white"
          title="Refresh books"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Genre
              </th>
              <th scope="col" className="px-6 py-3">
                URL
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                  Loading books...
                </td>
              </tr>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.book_id} className="border-b border-gray-800">
                  <td className="px-6 py-4 font-medium">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {book.genre.map((g, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 hover:text-yellow-400 truncate block max-w-[200px]"
                    >
                      {book.url}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/books/edit/${book.book_id}`} className="text-blue-500 hover:text-blue-400">
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(book.book_id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-400">
          Showing <span className="font-medium">{filteredBooks.length}</span> of{" "}
          <span className="font-medium">{books.length}</span> books
        </div>
      </div>
    </div>
  )
}

