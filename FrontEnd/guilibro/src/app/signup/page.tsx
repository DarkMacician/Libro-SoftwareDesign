'use client';
import Link from "next/link"
import { Mail, Lock, User, BookOpen } from "lucide-react"
import BookIcon from "@/components/book-icon"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: "user"
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.message || data.detail);
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-gradient"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#6d28d9] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-[20%] right-[5%] w-64 h-64 bg-[#f472b6] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[35%] w-64 h-64 bg-[#8b5cf6] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and branding */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            {/* Glowing effect behind logo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-[#1e293b] p-4 rounded-full border border-[#334155]">
              <BookOpen className="w-12 h-12 text-[#8b5cf6]" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#f472b6]">
                Join Libro
              </span>
            </h1>
            <p className="text-[#94a3b8]">Discover your next favorite book</p>
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
              {/* Input fields */}
              <div className="space-y-4">
                {/* Username input */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                  <div className="relative bg-[#0f172a] rounded-lg">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="w-5 h-5 text-[#94a3b8] group-hover:text-[#8b5cf6] transition-colors duration-300" />
                    </div>
                    <input
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="block w-full pl-10 pr-3 py-2.5 bg-transparent text-white placeholder-[#94a3b8] 
                        border border-[#334155] rounded-lg focus:outline-none focus:border-[#8b5cf6] 
                        focus:ring-2 focus:ring-[#8b5cf6]/50 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Email input */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                  <div className="relative bg-[#0f172a] rounded-lg">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="w-5 h-5 text-[#94a3b8] group-hover:text-[#8b5cf6] transition-colors duration-300" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email address"
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
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="block w-full pl-10 pr-3 py-2.5 bg-transparent text-white placeholder-[#94a3b8] 
                        border border-[#334155] rounded-lg focus:outline-none focus:border-[#8b5cf6] 
                        focus:ring-2 focus:ring-[#8b5cf6]/50 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded border-[#334155] bg-[#0f172a] text-[#8b5cf6]
                      focus:ring-[#8b5cf6] focus:ring-offset-0 focus:ring-offset-[#1e293b]
                      transition-all duration-300"
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="terms" className="text-[#94a3b8]">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#8b5cf6] hover:text-[#f472b6] transition-colors duration-300">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#8b5cf6] hover:text-[#f472b6] transition-colors duration-300">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg opacity-75 
                  group-hover:opacity-100 blur transition-all duration-300"></div>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-3 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] rounded-lg 
                    text-white font-medium transform transition-all duration-300 hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2 
                    focus:ring-offset-[#1e293b] disabled:opacity-50 disabled:cursor-not-allowed
                    hover:shadow-lg hover:shadow-[#8b5cf6]/25"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating account...
                    </div>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sign in link */}
        <p className="text-center text-[#94a3b8]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#8b5cf6] hover:text-[#f472b6] font-semibold transition-colors duration-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
