import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import BookForm from "@/components/admin/book-form"

interface EditBookProps {
  params: {
    id: string
  }
}

export default function EditBook({ params }: EditBookProps) {
  const bookId = params.id

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold">Chỉnh Sửa Sách</h1>
      </div>

      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <BookForm bookId={bookId} />
      </div>
    </div>
  )
}
