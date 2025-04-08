import React from 'react';
import { Search, Bell, User, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-[#181A20] border-b border-[#2B2F36] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <BookOpen className="h-8 w-8 text-[#F0B90B]" />
          <span className="text-xl font-bold">BookWeb</span>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full bg-[#2B2F36] text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#F0B90B]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Bell className="h-6 w-6 text-gray-400 hover:text-[#F0B90B] cursor-pointer" />
          <User className="h-6 w-6 text-gray-400 hover:text-[#F0B90B] cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;