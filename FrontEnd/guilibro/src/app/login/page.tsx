"use client"
import Link from "next/link"
import { Mail, Lock, User, BookOpen } from "lucide-react"
import BookIcon from "@/components/book-icon"
import { FormEvent, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-gradient"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-[#6d28d9] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-[10%] right-[15%] w-72 h-72 bg-[#f472b6] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[20%] left-[35%] w-72 h-72 bg-[#8b5cf6] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and branding */}
        <div className="text-center space-y-6">
          <div className="relative inline-block group">
            {/* Floating animation */}
            <div className="animate-float">
              {/* Glowing effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-[#1e293b] p-4 rounded-full border border-[#334155] transform transition-all duration-300 group-hover:scale-110">
                <BookOpen className="w-12 h-12 text-[#8b5cf6] transform transition-all duration-300 group-hover:rotate-12" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#f472b6]">
                Welcome Back
              </span>
            </h1>
            <p className="text-[#94a3b8]">Continue your reading journey</p>
          </div>
        </div>

        {/* Card container */}
        <div className="relative group">
          {/* Card glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg opacity-75 blur"></div>
          
          {/* Card content */}
          <div className="relative bg-[#1e293b]/90 backdrop-blur-xl p-8 rounded-lg border border-[#334155] shadow-xl">
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username input */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                <div className="relative bg-[#0f172a] rounded-lg">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="w-5 h-5 text-[#94a3b8] group-hover:text-[#8b5cf6] transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="block w-full pl-10 pr-3 py-2.5 bg-transparent text-white placeholder-[#94a3b8] 
                      border border-[#334155] rounded-lg focus:outline-none focus:border-[#8b5cf6] 
                      focus:ring-2 focus:ring-[#8b5cf6]/50 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                <div className="relative bg-[#0f172a] rounded-lg">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="w-5 h-5 text-[#94a3b8] group-hover:text-[#8b5cf6] transition-colors duration-300" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full pl-10 pr-3 py-2.5 bg-transparent text-white placeholder-[#94a3b8] 
                      border border-[#334155] rounded-lg focus:outline-none focus:border-[#8b5cf6] 
                      focus:ring-2 focus:ring-[#8b5cf6]/50 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="w-4 h-4 rounded border-[#334155] bg-[#0f172a] text-[#8b5cf6]
                      focus:ring-[#8b5cf6] focus:ring-offset-0 focus:ring-offset-[#1e293b]
                      transition-all duration-300"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-[#94a3b8]">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#8b5cf6] hover:text-[#f472b6] transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg opacity-75 
                  group-hover:opacity-100 blur transition-all duration-300"></div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-3 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg 
                    text-white font-medium transform transition-all duration-300 hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2 
                    focus:ring-offset-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed
                    hover:shadow-lg hover:shadow-[#8b5cf6]/25"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sign up link */}
        <div className="relative group">
          <p className="text-center text-[#94a3b8]">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="inline-flex items-center text-[#8b5cf6] hover:text-[#f472b6] font-semibold transition-colors duration-300"
            >
              Sign up
              <svg 
                className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
