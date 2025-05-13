"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, AlertCircle } from "lucide-react"
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
  const [urlWarning, setUrlWarning] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: [] as string[],
    url: "",
  })

  const [genreInput, setGenreInput] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "url") {
      validateUrl(value)
    }
  }

  const validateUrl = (url: string) => {
    setUrlWarning(null)

    if (url.includes("drive.google.com")) {
      if (!url.includes("/file/d/") && !url.includes("?id=")) {
        setUrlWarning(
          "URL Google Drive không hợp lệ. Vui lòng sử dụng URL có định dạng /file/d/{fileId}/view hoặc ?id={fileId}",
        )
      } else {
        // Check if it's likely a JSON file
        if (!url.includes(".json") && !url.toLowerCase().includes("json")) {
          setUrlWarning("Lưu ý: URL nên trỏ đến file JSON chứa danh sách các URL hình ảnh")
        }
      }
    }
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
      {error && <div className="bg-[#1c2438]/30 border border-red-800 text-red-300 p-4 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
            Tiêu đề sách
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1c2438]/50 border border-[#334155] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-white mb-1">
            Tác giả
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1c2438]/50 border border-[#334155] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="url" className="block text-sm font-medium text-white mb-1">
            URL sách (JSON chứa danh sách hình ảnh)
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#1c2438]/50 border border-[#334155] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent"
            placeholder="https://drive.google.com/file/d/your-file-id/view"
            required
          />
          {urlWarning && (
            <div className="mt-2 flex items-start gap-2 text-[#f472b6] text-sm">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{urlWarning}</span>
            </div>
          )}
          <p className="mt-1 text-sm text-gray-400">URL nên trỏ đến file JSON chứa mảng các URL hình ảnh</p>
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-white mb-1">
            Thể loại
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="genre"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#1c2438]/50 border border-[#334155] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:border-transparent"
              placeholder="Thêm thể loại"
            />
            <button
              type="button"
              onClick={handleAddGenre}
              className="px-4 py-2 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6d28d9]/20 hover:scale-[1.02]"
            >
              Thêm
            </button>
          </div>
          {formData.genre.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.genre.map((g, index) => (
                <span key={index} className="px-3 py-1 bg-[#1c2438]/50 border border-[#334155] rounded-full text-sm flex items-center gap-1 text-white">
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


      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-4 py-2 bg-[#1c2438]/50 hover:bg-[#1c2438] text-white text-center font-medium rounded-lg transition-all duration-300 border border-[#334155] hover:border-[#6d28d9]"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6d28d9]/20 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? "Đang lưu..." : isEditMode ? "Cập nhật sách" : "Thêm sách"}
        </button>
      </div>
    </form>
  )
}
