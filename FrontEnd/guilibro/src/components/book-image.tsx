"use client"

import { useState, useEffect } from "react"

interface BookImageProps {
  src: string
  alt: string
  className?: string
}

export default function BookImage({ src, alt, className = "" }: BookImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    // Reset state when src changes
    setImageSrc(src)
    setError(false)
  }, [src])

  // Handle image loading error
  const handleError = () => {
    // If the original URL fails, try with a proxy
    if (imageSrc === src) {
      // Use a CORS proxy if available, or fall back to a placeholder
      setImageSrc(`https://cors-anywhere.herokuapp.com/${src}`)
    } else {
      // If proxy also fails, show error state
      setError(true)
    }
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 ${className}`}>
        <p className="text-gray-400">Không thể tải hình ảnh</p>
      </div>
    )
  }

  return <img src={imageSrc || "/placeholder.svg"} alt={alt} onError={handleError} className={className} />
}
