"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  sub: string // username
  role: string // "admin" hoặc "user"
  exp: number
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [loading, setLoading] = useState(true)

  // Kiểm tra token khi component mount
  useEffect(() => {
    const token = Cookies.get("access_token")
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token)

        // Kiểm tra token hết hạn
        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove("access_token")
          setUser(null)
        } else {
          setUser({
            username: decoded.sub,
            role: decoded.role,
          })
        }
      } catch (error) {
        console.error("Invalid token:", error)
        Cookies.remove("access_token")
        setUser(null)
      }
    }
    setLoading(false)
  }, [])

  // Hàm đăng nhập
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      const { access_token } = data

      // Lưu token vào cookie với các tùy chọn bảo mật
      Cookies.set("access_token", access_token, {
        expires: 7, // Hết hạn sau 7 ngày
        secure: process.env.NODE_ENV === "production", // Chỉ gửi qua HTTPS trong production
        sameSite: "strict", // Bảo vệ chống CSRF
        path: "/", // Có thể truy cập từ tất cả các trang
      })

      // Decode token để lấy thông tin người dùng
      const decoded = jwtDecode<JwtPayload>(access_token)
      setUser({
        username: decoded.sub,
        role: decoded.role,
      })

      // Chuyển hướng dựa trên vai trò
      if (decoded.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }


  const logout = () => {
    Cookies.remove("access_token")
    setUser(null)
    router.push("/login")
  }

  // Hàm kiểm tra người dùng có phải là admin không
  const isAdmin = () => {
    return user?.role === "admin"
  }

  // Hàm kiểm tra người dùng có phải là user không
  const isUser = () => {
    return user?.role === "user"
  }

  // Hàm lấy token
  const getToken = () => {
    return Cookies.get("access_token")
  }

  return {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isUser,
    getToken,
  }
}
