"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload } from "lucide-react"
import { getAllBooks, addBook } from "@/lib/api"
import { useRouter } from "next/navigation"

interface BookFormProps {
  bookId?: string
}

export default function BookForm({ bookId }: BookFormProps) {
  const router = useRouter()
  const isEditMode = !!bookId

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: [] as string[],
    url: "",
  })

  const [genreInput, setGenreInput] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)

  // Fetch book data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchBook = async () => {
        try {
          const books = await getAllBooks()
          const book = books.find((b) => b.book_id.toString() === bookId)

          if (book) {
            setFormData({
              title: book.title,
              author: book.author,
              genre: book.genre,
              url: book.url,
            })
          } else {
            setError("Không tìm thấy sách")
          }
        } catch (err) {
          setError("Không thể tải thông tin sách")
          console.error(err)
        }
      }

      fetchBook()
    }
  }, [bookId, isEditMode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddGenre = () => {
    if (genreInput.trim() && !formData.genre.includes(genreInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        genre: [...prev.genre, genreInput.trim()],
      }))
      setGenreInput("")
    }
  }

  const handleRemoveGenre = (genreToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.filter((g) => g !== genreToRemove),
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (isEditMode) {
        // Update book logic would go here
        alert("Chức năng cập nhật sách chưa được triển khai")
      } else {
        // Add new book
        const result = await addBook(formData)

        if (result) {
          alert("Thêm sách thành công!")
          router.push("/admin")
        } else {
          setError("Không thể thêm sách")
        }
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi lưu sách")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Tiêu đề sách
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#252525] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
            Tác giả
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#252525] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
            URL sách
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#252525] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="https://example.com/book.pdf"
            required
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
            Thể loại
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="genre"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#252525] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Thêm thể loại"
            />
            <button
              type="button"
              onClick={handleAddGenre}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md"
            >
              Thêm
            </button>
          </div>
          {formData.genre.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.genre.map((g, index) => (
                <span key={index} className="px-2 py-1 bg-[#252525] rounded-full text-sm flex items-center gap-1">
                  {g}
                  <button
                    type="button"
                    onClick={() => handleRemoveGenre(g)}
                    className="text-gray-400 hover:text-red-400 ml-1"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Ảnh bìa (Tùy chọn)</label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="cover-image"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-[#252525] hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">
                  <span className="font-medium">Nhấp để tải lên</span> hoặc kéo và thả
                </p>
                <p className="text-xs text-gray-500">PNG, JPG hoặc WEBP (Tối đa 2MB)</p>
              </div>
              <input id="cover-image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          {coverImage && <p className="mt-2 text-sm text-gray-400">Đã chọn: {coverImage.name}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-4 py-2 bg-[#252525] text-white rounded-md hover:bg-[#333333] transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Đang lưu..." : isEditMode ? "Cập nhật sách" : "Thêm sách"}
        </button>
      </div>
    </form>
  )
}
