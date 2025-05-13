"use client"
import React from 'react';
import { Search, Bell, User, BookOpen, LogOut, LogIn } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react"
import { isAuthenticated, isAdmin, logout, getUsername } from "@/lib/auth"

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setAuthenticated(isAuthenticated())
    setAdmin(isAdmin())
    setUsername(getUsername())

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center space-x-4 group">
          <BookOpen className="h-8 w-8 text-[#6d28d9] transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xl font-bold gradient-text">Libro</span>
        </Link>
        
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 rounded-lg -m-0.5"></div>
            <input
              type="text"
              placeholder="Search books..."
              className="w-full bg-[#151b2d]/80 text-white rounded-lg py-2 px-4 pl-10 
                border border-[#1e293b] backdrop-blur-sm
                focus:outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-[#6d28d9]/50
                transition-all duration-300 relative z-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#94a3b8] group-hover:text-[#6d28d9] transition-colors duration-300 z-20" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {authenticated ? (
            <>
              {admin && (
                <Link href="/admin" className="relative group">
                  <span className="text-xs px-3 py-1 rounded-full relative z-10 
                    bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white
                    transition-transform duration-300 inline-block
                    hover:scale-110">
                    Admin
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] opacity-50 blur-md -z-10 
                    group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              )}

              <div className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-full blur opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
                  <div className="relative bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white h-8 w-8 rounded-full 
                    flex items-center justify-center transform transition-all duration-300 
                    hover:scale-110 hover:rotate-12">
                    <User size={16} />
                  </div>
                </div>
                <span className="text-sm hidden md:inline text-[#e2e8f0] group-hover:text-white transition-colors duration-300">
                  {username}
                </span>
              </div>

              <button 
                onClick={logout} 
                className="text-[#94a3b8] hover:text-[#f472b6] transition-all duration-300 
                  transform hover:scale-110 hover:rotate-12" 
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              onClick={() => {
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
              }} 
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] opacity-0 blur 
                group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <div className="relative flex items-center gap-2 text-[#94a3b8] group-hover:text-white 
                transition-colors duration-300 px-4 py-2 rounded-lg">
                <LogIn size={20} className="transform transition-transform group-hover:rotate-12 duration-300" />
                <span className="hidden md:inline">Login</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;