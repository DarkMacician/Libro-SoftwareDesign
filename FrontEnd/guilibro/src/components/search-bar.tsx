"use client"

import type React from "react"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Chuyển hướng đến trang search, để trang search gọi API
      router.push(`/search?title=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-4">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="search"
        className="block w-full p-2 pl-10 text-sm text-gray-300 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  )
}
