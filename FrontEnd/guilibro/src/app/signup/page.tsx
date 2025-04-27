'use client';
import Link from "next/link"
import { Mail, Lock, User } from "lucide-react"
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
    <div className="min-h-screen bg-[#0C0E12] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-[#181A20] p-8 rounded-2xl border border-[#2B2F36]">
        <div className="flex flex-col items-center justify-center text-center">
          <BookIcon className="w-12 h-12 text-yellow-500" />
          <h1 className="mt-6 text-3xl font-bold text-white">Create an account</h1>
          <p className="mt-2 text-gray-400">Join our reading community</p>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-3 py-2 bg-[#2a2a2a] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-3 py-2 bg-[#2a2a2a] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2 bg-[#2a2a2a] border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="w-4 h-4 bg-[#2a2a2a] border-none rounded text-yellow-500 focus:ring-yellow-500 focus:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-400">
                I agree to the{" "}
                <Link href="/terms" className="text-yellow-500 hover:text-yellow-400">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-yellow-500 hover:text-yellow-400">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-500 hover:text-yellow-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
