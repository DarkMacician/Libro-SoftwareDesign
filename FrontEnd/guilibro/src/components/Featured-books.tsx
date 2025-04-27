"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const books = [
  {
    id: 1,
    title: "Đường Phương Nam",
    author: "Nguyễn Lê Tuyên",
    cover: "/book1.jpg",
    price: 75000,
    originalPrice: 95000,
    rating: 4.5,
    slug: "duong-phuong-nam",
  },
  {
    id: 2,
    title: "Đưa Vào Triết Học",
    author: "Nguyễn Tất Trung",
    cover: "/book2.jpg",
    price: 85000,
    originalPrice: 110000,
    rating: 4.8,
    slug: "dua-vao-triet-hoc",
  },
  {
    id: 3,
    title: "Góp Phần Tìm Hiểu Lịch Sử Việt",
    author: "Trần Việt Ngọc",
    cover: "/book3.jpg",
    price: 92000,
    originalPrice: 120000,
    rating: 4.7,
    slug: "gop-phan-tim-hieu-lich-su-viet",
  },
  {
    id: 4,
    title: "Tư Duy Phản Biện",
    author: "Lê Minh Tuấn",
    cover: "/placeholder.svg?height=300&width=200",
    price: 68000,
    originalPrice: 85000,
    rating: 4.6,
    slug: "tu-duy-phan-bien",
  },
  {
    id: 5,
    title: "Nghệ Thuật Sống Đẹp",
    author: "Nguyễn Thị Hoa",
    cover: "/placeholder.svg?height=300&width=200",
    price: 72000,
    originalPrice: 90000,
    rating: 4.4,
    slug: "nghe-thuat-song-dep",
  },
  {
    id: 6,
    title: "Kinh Tế Học Đại Cương",
    author: "Trần Văn Minh",
    cover: "/placeholder.svg?height=300&width=200",
    price: 105000,
    originalPrice: 130000,
    rating: 4.9,
    slug: "kinh-te-hoc-dai-cuong",
  },
  {
    id: 7,
    title: "Lịch Sử Việt Nam",
    author: "Phạm Quang Hiển",
    cover: "/placeholder.svg?height=300&width=200",
    price: 88000,
    originalPrice: 110000,
    rating: 4.7,
    slug: "lich-su-viet-nam",
  },
  {
    id: 8,
    title: "Văn Học Việt Nam Hiện Đại",
    author: "Lê Thị Hương",
    cover: "/placeholder.svg?height=300&width=200",
    price: 78000,
    originalPrice: 95000,
    rating: 4.5,
    slug: "van-hoc-viet-nam-hien-dai",
  },
]

export default function FeaturedBooks() {
  const [currentPage, setCurrentPage] = useState(0)
  const booksPerPage = 4
  const totalPages = Math.ceil(books.length / booksPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const visibleBooks = books.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleBooks.map((book) => (
          <Link key={book.id} href={`/sach/${book.slug}`} className="group">
            <div className="book-card">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="book-title">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(book.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : i < book.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({book.rating})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="book-price">{book.price.toLocaleString()}đ</span>
                  <span className="book-original-price">{book.originalPrice.toLocaleString()}đ</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={prevPage}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentPage === i ? "bg-[#e30613] text-white" : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
