
import RecommendedBooks from "@/components/recommended-books"
import ProtectedRoute from "@/components/protected-route"
import Hero from "@/components/Hero"
import BookCategories from "@/components/BookCategories"

export default function Home() {
  return (
    <ProtectedRoute requireUser>
      <div>
        <Hero />
        <div className="px-6 py-8">
          <BookCategories />
          <RecommendedBooks />
        </div>
      </div>
    </ProtectedRoute>
  )
}
