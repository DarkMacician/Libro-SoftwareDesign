import React from 'react';
import { Book, Coffee, Heart, Star, Compass, Brain } from 'lucide-react';

const categories = [
  { icon: Book, name: 'Fiction', count: '2,531 books' },
  { icon: Coffee, name: 'Romance', count: '1,831 books' },
  { icon: Compass, name: 'Adventure', count: '1,256 books' },
  { icon: Star, name: 'Fantasy', count: '986 books' },
  { icon: Brain, name: 'Self-Help', count: '754 books' },
  { icon: Heart, name: 'Young Adult', count: '1,432 books' },
];

const BookCategories = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-[#F0B90B]">Book Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-[#181A20] p-6 rounded-lg border border-[#2B2F36] hover:border-[#F0B90B] transition-colors cursor-pointer group"
          >
            <category.icon className="h-8 w-8 mb-3 text-[#F0B90B] group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">{category.name}</h3>
            <p className="text-sm text-gray-400">{category.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookCategories;