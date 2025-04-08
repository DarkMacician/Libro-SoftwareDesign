import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000&h=800"
        alt="Library"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
        <div className="p-8 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Discover Your Next Great Read</h1>
          <p className="text-lg text-gray-200 mb-6">
            Explore thousands of books from contemporary bestsellers to timeless classics.
          </p>
          <button className="bg-[#F0B90B] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#F0B90B]/80 transition-colors">
            Start Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;