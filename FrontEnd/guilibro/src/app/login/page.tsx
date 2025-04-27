"use client"
import Link from "next/link"
import { Mail, Lock } from "lucide-react"
import BookIcon from "@/components/book-icon"
import { FormEvent, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import { login } from "@/lib/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const success = await login(username, password)

      if (success) {
        router.push("/") 
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault()
  //   setError("")
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     })

  //     const data = await response.json()

  //     if (response.ok && data.access_token) {
  //       // Store token in HTTP-only cookie
  //       Cookies.set('auth_token', data.access_token, {
  //         expires: 7,
  //         secure: true,
  //         sameSite: 'lax', // Changed to 'lax' to work better with cross-origin requests
  //         path: '/' // Ensure cookie is available across the site
  //       })             
  //       router.push("/dashboard")
  //     } else {
  //       setError(data.detail)
  //     }
  //   } catch (err) {
  //     setError("An error occurred. Please try again.")
  //   }
  // }
  // Check if user is already logged in

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C0E12] p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#181A20] rounded-lg">
        <div className="flex flex-col items-center">
          <BookIcon className="h-12 w-12 text-[#F0B90B]" />
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-md p-3 text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#2a2a2a] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#2a2a2a] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 bg-[#2a2a2a] border-none rounded text-yellow-500 focus:ring-yellow-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="text-yellow-500 hover:text-yellow-400">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-yellow-500 hover:text-yellow-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
