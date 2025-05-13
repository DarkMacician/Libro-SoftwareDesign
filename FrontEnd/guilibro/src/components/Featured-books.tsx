"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, BookOpen, Clock } from "lucide-react"

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
    readTime: "6h 30m",
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
    readTime: "7h 15m",
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
    readTime: "5h 45m",
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
    readTime: "4h 20m",
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
    readTime: "3h 10m",
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
    readTime: "8h 5m",
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
    readTime: "5h 30m",
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
    readTime: "6h 15m",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
        {visibleBooks.map((book) => (
          <Link key={book.id} href={`/sach/${book.slug}`} className="group">
            <div className="relative overflow-hidden rounded-xl transition-all duration-500 glass-effect hover:shadow-xl hover:shadow-[#6d28d9]/20 border border-[#1e293b] hover:border-[#6d28d9] transform hover:-translate-y-2">
              
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Book Cover */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-full 
                group-hover:translate-y-0 transition-transform duration-500">
                
                {/* Book Info */}
                <div className="space-y-3 text-white">
                  <h3 className="text-lg font-semibold line-clamp-2 gradient-text">{book.title}</h3>
                  <p className="text-sm text-[#94a3b8]">{book.author}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-[#f472b6]" />
                      <span>{book.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-[#6d28d9]" />
                      <span>{book.readTime}</span>
                    </div>
                  </div>

                  {/* Read Button */}
                  <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-[#6d28d9] to-[#f472b6]
                    text-white font-semibold transform transition-all duration-300
                    hover:shadow-lg hover:shadow-[#6d28d9]/50 hover:scale-105
                    flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Đọc Ngay</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Tag */}
            <div className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold
              bg-gradient-to-r from-[#6d28d9] to-[#f472b6] text-white
              opacity-0 group-hover:opacity-100 transition-all duration-500
              transform group-hover:translate-y-0 translate-y-2">
              Nổi Bật
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
