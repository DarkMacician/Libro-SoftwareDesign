import type { ReactNode } from "react"
import AdminHeader from "@/components/admin/admin-header"
import ProtectedRoute from "@/components/protected-route"
import Header from "@/components/Header"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen text-white">
        <Header />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
