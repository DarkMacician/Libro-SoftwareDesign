"use client"

import { useState, useEffect, useCallback } from "react"
import { getGoogleDriveImageUrls } from "@/lib/google-drive"
import { RefreshCw } from "lucide-react"

interface GoogleDriveImageProps {
  src: string
  alt: string
  className?: string
  url?: string
  onLoad?: () => void
  onError?: () => void
}

export default function GoogleDriveImage({ 
  src, 
  alt, 
  className = "", 
  url,
  onLoad, 
  onError 
}: GoogleDriveImageProps) {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0)
  const [urls, setUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Generate alternative URLs when src changes or on retry
  useEffect(() => {
    if (url) {
      // If direct URL is provided, use proxy URL
      const proxyUrl = `/api/image-proxy?url=${url}`
      setUrls([proxyUrl])
    } else {
      // Otherwise use Google Drive URL formats
      const imageUrls = getGoogleDriveImageUrls(src)
      setUrls(imageUrls)
    }
    setCurrentUrlIndex(0)
    setLoading(true)
    setError(false)
  }, [src, url, retryCount])

  // Current URL to try
  const currentUrl = urls[currentUrlIndex] || ""

  const handleError = useCallback(() => {
    // Try the next URL format if available
    if (currentUrlIndex < urls.length - 1) {
      setCurrentUrlIndex((prevIndex) => prevIndex + 1)
    } else {
      console.error("Failed to load image after trying all URL formats:", src)
      setError(true)
      setLoading(false)
      onError?.()
    }
  }, [currentUrlIndex, urls.length, src, onError])

  const handleLoad = useCallback(() => {
    setLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1)
  }, [])

  // If we've tried all URLs and still have an error
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-800 ${className}`}>
        <p className="text-gray-400 mb-2">Không thể tải hình ảnh</p>
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md transition-colors text-sm"
        >
          <RefreshCw size={14} />
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      )}
      {currentUrl && (
        <img
          src={currentUrl || "/placeholder.svg"}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={` ${loading ? "opacity-0" : "opacity-100"}`}
          crossOrigin="anonymous"
        />
      )}
    </div>
  )
}
