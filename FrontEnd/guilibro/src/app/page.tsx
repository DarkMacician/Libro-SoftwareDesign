
import RecommendedBooks from "@/components/recommended-books"
import ProtectedRoute from "@/components/protected-route"
import Hero from "@/components/Hero"
import Header from "@/components/Header"


export default function Home() {
  return (
    <ProtectedRoute requireUser>
      <Header />
      <div className="container min-h-screen mx-auto bg-gradient-to-b from-libro-dark-950 to-libro-dark-900 text-white px-4 ">
        <Hero />
        <div className="py-8 ">          
          <RecommendedBooks />
        </div>
      </div>
    </ProtectedRoute>
  )
}
