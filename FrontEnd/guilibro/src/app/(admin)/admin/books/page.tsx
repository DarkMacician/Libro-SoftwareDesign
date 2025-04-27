import Link from "next/link"
import { PlusCircle } from "lucide-react"
import BooksTable from "@/components/admin/books-table"

export default function BooksManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books Management</h1>
        <Link
          href="/admin/books/add"
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Add New Book
        </Link>
      </div>

      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <BooksTable />
      </div>
    </div>
  )
}
