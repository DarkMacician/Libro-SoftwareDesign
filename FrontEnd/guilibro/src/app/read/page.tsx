"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Bookmark, Check, RefreshCw } from "lucide-react"
import Link from "next/link"
import { getBookDetails, bookmarkPage as saveBookmarkPage, getBookmark } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/protected-route"
import { getGoogleDriveDirectUrl, extractGoogleDriveFileId } from "@/lib/google-drive"
import GoogleDriveImage from "@/components/google-drive-image"
import type { Book } from "@/lib/api"

export default function ReadBook() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getToken } = useAuth()
  const bookId = searchParams.get("book_id")
  const bookmarkPage = searchParams.get("page")

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [bookmarkSuccess, setBookmarkSuccess] = useState(false)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loadingImages, setLoadingImages] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [imageCache, setImageCache] = useState<{ [key: string]: string }>({})
  const [lastBookmarkedPage, setLastBookmarkedPage] = useState<number | null>(null)
  useEffect(() => {
    async function fetchBookDetail() {
      if (!bookId) {
        setError("ID sách không hợp lệ");
        setLoading(false);
        return;
      }

      try {
        const bookData = await getBookDetails(Number.parseInt(bookId));
        if (!bookData) {
          setError("Không tìm thấy sách");
          return;
        }
        
        setBook(bookData);
        
        // Kiểm tra bookmark từ URL parameter trước
        if (bookmarkPage) {
          const page = parseInt(bookmarkPage);
          if (!isNaN(page) && page > 0) {
            setCurrentPage(page);
          }
        } else {
          // Nếu không có parameter, lấy từ API bookmark
          const savedPage = await getBookmark(bookData.book_id);
          if (savedPage) {
            setCurrentPage(savedPage);
            setLastBookmarkedPage(savedPage);
          }
        }

        // Fetch images from the book URL
        fetchBookImages(bookData.url);
      } catch (err) {
        console.error("Lỗi khi tải thông tin sách:", err);
        setError("Đã xảy ra lỗi khi tải thông tin sách");
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetail();
  }, [bookId, bookmarkPage]);

  const fetchBookImages = async (url: string) => {
    setLoadingImages(true)
    setError(null)

    try {
      // Get direct download URL for the JSON file
      const directUrl = getGoogleDriveDirectUrl(url)
      if (!directUrl) {
        throw new Error("Không thể tạo URL tải xuống trực tiếp")
      }

      // Import the fetchJsonWithFallbacks function
      const { fetchJsonWithFallbacks } = await import("@/lib/cors-proxy")

      // Use our improved fetch method
      const imageUrlsArray = await fetchJsonWithFallbacks(directUrl)

      if (Array.isArray(imageUrlsArray)) {
        setImageUrls(imageUrlsArray)
        setTotalPages(imageUrlsArray.length)
      } else {
        throw new Error("Định dạng dữ liệu không hợp lệ")
      }
    } catch (err) {
      console.error("Lỗi khi tải hình ảnh:", err)
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định'
      setError(`Không thể tải hình ảnh sách. ${errorMessage}`)
    } finally {
      setLoadingImages(false)
    }
  }

  const loadImage = async (url: string, retryCount = 0): Promise<string> => {
    if (imageCache[url]) {
      return imageCache[url]
    }

    try {
      const proxyUrl = getProxiedImageUrl(url)
      const img = new Image()

      return new Promise((resolve, reject) => {
        img.onload = () => {
          setImageCache(prev => ({ ...prev, [url]: proxyUrl }))
          resolve(proxyUrl)
        }

        img.onerror = async () => {
          if (retryCount < 3) {
            // Thử lại với delay tăng dần
            await new Promise(r => setTimeout(r, 1000 * (retryCount + 1)))
            resolve(loadImage(url, retryCount + 1))
          } else {
            reject(new Error('Failed to load image after retries'))
          }
        }

        img.src = proxyUrl
      })
    } catch (error) {
      console.error('Error loading image:', error)
      throw error
    }
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
  }

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
      const success = await saveBookmarkPage(book.book_id, currentPage)
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

  // Function to get a server-side proxied image URL
  function getProxiedImageUrl(urlOrId: string): string {
    const fileId = extractGoogleDriveFileId(urlOrId) || urlOrId
    if (!fileId) return urlOrId
    return `/api/image-proxy?url=${encodeURIComponent(fileId)}`
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

  if (error && !book) {
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

  if (!book) {
    return (
      <ProtectedRoute requireUser>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">
            Không thể tải thông tin sách
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
      <div className="container mx-auto px-30 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link
            href={`/view-detail?book_id=${book.book_id}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm bg-[#1c2438]/50 hover:bg-[#1c2438] text-center rounded-lg transition-all duration-300 border border-[#334155] hover:border-[#6d28d9]"
          >
            <ArrowLeft size={16} />
            Quay lại chi tiết sách
          </Link>
          <h1 className="text-xl font-bold text-white">{book.title}</h1>
        </div>

        {bookmarkSuccess && (
          <div className="mb-4 bg-[#1c2438]/30 border border-[#6d28d9] text-white p-4 rounded-md flex items-center gap-2">
            <Check size={16} />
            Đã đánh dấu trang {currentPage}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-[#1c2438]/30 border border-red-800 text-red-300 p-4 rounded-md flex justify-between items-center">
            <div>{error}</div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6d28d9]/20 hover:scale-[1.02]"
            >
              <RefreshCw size={16} />
              Thử lại
            </button>
          </div>
        )}

        <div className="bg-[#1c2438] rounded-lg overflow-hidden border border-[#334155]">
          <div className="p-4 border-b border-[#334155] flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Trang {currentPage} / {totalPages}
            </div>
            <button
              onClick={handleBookmark}
              disabled={bookmarkLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6d28d9]/20 hover:scale-[1.02] disabled:opacity-50"
            >
              <Bookmark size={16} />
              {bookmarkLoading ? "Đang lưu..." : "Đánh dấu trang"}
            </button>
          </div>

          <div className="p-4 ">
            {loadingImages ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6d28d9] mb-4"></div>
                <p className="text-white">Đang tải hình ảnh...</p>
              </div>
            ) : imageUrls.length > 0 ? (
              <div className="max-w-full">
                {imageUrls[currentPage - 1] ? (
                  <GoogleDriveImage
                    src={imageUrls[currentPage - 1]}
                    alt={`Trang ${currentPage}`}
                    className="max-w-full "
                    onError={async () => {
                      try {
                        const cachedUrl = await loadImage(imageUrls[currentPage - 1])
                        const newUrls = [...imageUrls]
                        newUrls[currentPage - 1] = cachedUrl
                        setImageUrls(newUrls)
                      } catch (err) {
                        setError("Không thể tải hình ảnh. Vui lòng thử lại.")
                      }
                    }}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <p>Không có hình ảnh cho trang này</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
                <p className="text-gray-400 mb-6">Tác giả: {book.author}</p>
                <p className="mb-4">Không thể tải hình ảnh từ URL sách.</p>
                <p className="text-gray-500 italic">Vui lòng kiểm tra URL: {book.url}</p>
                <button
                  onClick={handleRetry}
                  className="mt-4 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md transition-colors mx-auto"
                >
                  <RefreshCw size={16} />
                  Thử lại
                </button>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-[#334155] flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
              className="flex items-center gap-2 bg-[#1c2438]/50 hover:bg-[#1c2438] text-white px-4 py-2 text-center font-medium rounded-lg transition-all duration-300 border border-[#334155] hover:border-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              Trang trước
            </button>
            <div className="text-sm text-white">
              Trang {currentPage} / {totalPages}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-2 bg-[#1c2438]/50 hover:bg-[#1c2438] text-white px-4 py-2 text-center font-medium rounded-lg transition-all duration-300 border border-[#334155] hover:border-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed"
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
function isUser() {
  throw new Error("Function not implemented.")
}

