"use client"
import React from 'react';
import { Search, Bell, User, BookOpen, LogOut,LogIn } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react"
import { isAuthenticated, isAdmin, logout, getUsername } from "@/lib/auth"

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    setAuthenticated(isAuthenticated())
    setAdmin(isAdmin())
    setUsername(getUsername())
  }, [])


  return (
    <nav className="bg-[#181A20] border-b border-[#2B2F36] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-4">
          <BookOpen className="h-8 w-8 text-[#F0B90B]" />
          <span className="text-xl font-bold">Libro</span>
        </Link>
        
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full bg-[#2B2F36] text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#F0B90B]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
        {authenticated ? (
          <>
            {admin && (
              <Link href="/admin" className="text-gray-400 hover:text-white flex items-center gap-1">
                <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">Admin</span>
              </Link>
            )}

            <div className="flex items-center gap-2">
              <div className="bg-yellow-500 text-black h-8 w-8 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-sm hidden md:inline">{username}</span>
            </div>

            <button onClick={logout} className="text-gray-400 hover:text-white" title="Logout">
              <LogOut size={20} />
            </button>
          </>
        ) : (
            <Link href="/login" onClick={() => {
            document.cookie.split(";").forEach((c) => {
              document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            }} className="text-gray-400 hover:text-white flex items-center gap-1">
            <LogIn size={20} />
            <span className="hidden md:inline">Login</span>
            </Link>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;