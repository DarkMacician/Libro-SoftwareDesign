"use client"

import { Search, User, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function AdminHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 text-sm rounded-md bg-[#252525] border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Tìm kiếm..."
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500 text-black h-8 w-8 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">{user?.username || "Admin"}</span>
          </div>
          <button onClick={logout} className="text-gray-400 hover:text-white flex items-center gap-1">
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  )
}
