"use client"

import Link from "next/link"
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from "lucide-react"
import BookIcon from "@/components/book-icon"
import { useAuth } from "@/hooks/useAuth"

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
  { icon: <BookOpen size={20} />, label: "Quản lý sách", href: "/admin/books" },

]

export default function AdminSidebar() {
  const { logout } = useAuth()

  return (
    <aside className="w-64 bg-[#1e293b] border-r border-[#334155] h-full flex flex-col shadow-lg">
      <div className="p-4 border-b border-[#334155]">
        <Link href="/admin" className="flex items-center gap-2">
          <BookIcon className="h-8 w-8 text-[#8b5cf6]" />
          <span className="font-bold text-xl text-white">BookWeb</span>
          <span className="text-xs bg-[#8b5cf6] text-white px-2 py-0.5 rounded">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 text-[#94a3b8] hover:text-white px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#0f172a] group relative"
              >
                <div className="text-[#94a3b8] group-hover:text-[#8b5cf6] transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
                <span className="absolute inset-y-0 left-0 w-1 bg-[#8b5cf6] rounded-r-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#334155]">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-[#94a3b8] hover:text-[#f472b6] w-full px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#0f172a] group"
        >
          <LogOut size={20} className="transition-colors group-hover:text-[#f472b6]" />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}
