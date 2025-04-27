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
    <aside className="w-64 bg-[#1a1a1a] border-r border-gray-800 h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-2">
          <BookIcon className="h-8 w-8 text-yellow-500" />
          <span className="font-bold text-xl">BookWeb</span>
          <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-[#252525] px-3 py-2 rounded-md transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-gray-400 hover:text-white w-full px-3 py-2 rounded-md transition-colors"
        >
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}
