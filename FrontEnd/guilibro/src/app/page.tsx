import React from 'react';
import { Search, Menu, Bell, User, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import BookCategories from '@/components/BookCategories';
import BookGrid from '@/components/BookGrid';

function App() {
  return (
    <div className="min-h-screen bg-[#0C0E12] text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <Hero />
            <BookCategories />
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#F0B90B]">Recommended Books</h2>
              <BookGrid />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;