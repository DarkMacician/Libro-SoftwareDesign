"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  requireUser?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false, requireUser = false }: ProtectedRouteProps) {
  const { user, loading, isAdmin, isUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // Nếu không có người dùng, chuyển hướng đến trang đăng nhập
      if (!user) {
        router.push("/login")
        return
      }

      // Kiểm tra quyền admin
      if (requireAdmin && !isAdmin()) {
        router.push("/")
        return
      }

      // Kiểm tra quyền user
      if (requireUser && !isUser()) {
        router.push("/admin")
        return
      }
    }
  }, [loading, user, requireAdmin, requireUser, isAdmin, isUser, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  // Nếu không có người dùng hoặc không có quyền, không hiển thị nội dung
  if (!user || (requireAdmin && !isAdmin()) || (requireUser && !isUser())) {
    return null
  }

  // Nếu có quyền, hiển thị nội dung
  return <>{children}</>
}
