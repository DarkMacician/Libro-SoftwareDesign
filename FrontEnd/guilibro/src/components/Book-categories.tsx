import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "KGVH Hồ Chí Minh",
    icon: "/icons/hcm.png",
    slug: "kgvh-ho-chi-minh",
  },
  {
    id: 2,
    name: "Kinh tế",
    icon: "/icons/economy.png",
    slug: "kinh-te",
  },
  {
    id: 3,
    name: "Văn hóa xã hội",
    icon: "/icons/culture.png",
    slug: "van-hoa-xa-hoi",
  },
  {
    id: 4,
    name: "Lịch sử - Chính trị",
    icon: "/icons/history.png",
    slug: "lich-su-chinh-tri",
  },
  {
    id: 5,
    name: "Sức khỏe & Cuộc sống",
    icon: "/icons/health.png",
    slug: "suc-khoe-cuoc-song",
  },
  {
    id: 6,
    name: "Giáo trình",
    icon: "/icons/education.png",
    slug: "giao-trinh",
  },
  {
    id: 7,
    name: "Thiếu nhi",
    icon: "/icons/children.png",
    slug: "thieu-nhi",
  },
  {
    id: 8,
    name: "Ngoại ngữ - Từ điển",
    icon: "/icons/language.png",
    slug: "ngoai-ngu-tu-dien",
  },
  {
    id: 9,
    name: "Tốt đời đẹp đạo",
    icon: "/icons/lifestyle.png",
    slug: "tot-doi-dep-dao",
  },
  {
    id: 10,
    name: "Văn học",
    icon: "/icons/literature.png",
    slug: "van-hoc",
  },
  {
    id: 11,
    name: "Ebook khác",
    icon: "/icons/other.png",
    slug: "ebook-khac",
  },
  {
    id: 12,
    name: "Ebook các Nhà xuất",
    icon: "/icons/publisher.png",
    slug: "ebook-nha-xuat-ban",
  },
]

export default function BookCategories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/danh-muc/${category.slug}`} className="flex flex-col items-center group">
          <div className="category-icon">
            <Image
              src={category.icon || "/placeholder.svg"}
              alt={category.name}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-center text-sm font-medium">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
