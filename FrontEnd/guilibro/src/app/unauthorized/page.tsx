import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-gray-400 mb-6 max-w-md">
        You don&apos;t have permission to access this page. This area is restricted to administrators only.
      </p>
      <Link
        href="/"
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-md transition-colors duration-200"
      >
        Return to Home
      </Link>
    </div>
  )
}
