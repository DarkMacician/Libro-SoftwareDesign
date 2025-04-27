"use client"

import { User, LogOut, Search } from "lucide-react"
import Link from "next/link"

import { useAuth } from "@/hooks/useAuth"
import SearchBar from "./search-bar"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-[#181A20] border-b border-[#2B2F36] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <div className="h-8 w-8 text-[#F0B90B]" />
          <span className="text-xl font-bold">Libro</span>
        </Link>
        <SearchBar />

      


      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 text-black h-8 w-8 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <span className="text-sm font-medium hidden md:inline">{user?.username || "Người dùng"}</span>
        </div>
        <button onClick={logout} className="text-gray-400 hover:text-white" title="Đăng xuất">
          <LogOut size={20} />
        </button>
      </div>
      </div>
    </nav>
  )
}
