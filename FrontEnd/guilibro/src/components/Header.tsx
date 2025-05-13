"use client"

import { User, LogOut, Search } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import SearchBar from "./search-bar"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0f172a]/80 border-b border-[#334155] py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-4 group relative"
        >
          <span className="text-xl font-bold pl-10 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] bg-clip-text text-transparent
            group-hover:from-[#8b5cf6] group-hover:to-[#ec4899] transition-all duration-300">
            Libro
          </span>
          {/* Hover effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] opacity-0 
            group-hover:opacity-20 blur-lg transition-all duration-300 rounded-lg"></div>
        </Link>

        <SearchBar />

        <div className="flex items-center gap-4 pr-10">
          <div className="flex items-center gap-2 group">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-full 
                opacity-0 group-hover:opacity-70 blur transition-opacity duration-300"></div>
              
              {/* Avatar */}
              <div className="relative bg-gradient-to-r from-[#6d28d9] to-[#f472b6] h-8 w-8 rounded-full 
                flex items-center justify-center transform transition-all duration-300 
                group-hover:scale-110 group-hover:rotate-12">
                <User size={16} className="text-white" />
              </div>
            </div>
            
            {/* Username */}
            <span className="text-sm font-medium hidden md:inline text-[#94a3b8] group-hover:text-white 
              transition-colors duration-300">
              {user?.username}
            </span>
          </div>

          {/* Logout button */}
          <button 
            onClick={logout} 
            className="relative group"
            title="Đăng xuất"
          >
            {/* Button glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg 
              opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            
            {/* Icon */}
            <LogOut size={20} className="text-[#94a3b8] group-hover:text-[#f472b6] transform 
              transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
          </button>
        </div>
      </div>
    </nav>
  )
}
