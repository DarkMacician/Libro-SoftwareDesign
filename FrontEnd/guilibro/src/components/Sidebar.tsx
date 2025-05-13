import React from 'react';
import { Home, BookOpen, Star, Clock, Heart, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 glass-effect min-h-screen p-4 fixed left-0 top-0 z-40">
      <nav className="h-full pt-20">
        <ul className="space-y-2">
          {[
            { icon: Home, label: 'Home' },
            { icon: BookOpen, label: 'Library' },
            { icon: Star, label: 'Featured' },
            { icon: Clock, label: 'Recent' },
            { icon: Heart, label: 'Favorites' },
            { icon: Settings, label: 'Settings' },
          ].map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="relative group flex items-center space-x-3 px-4 py-3 rounded-lg 
                  transition-all duration-300"
              >
                {/* Hover background with gradient and blur */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9]/20 to-[#f472b6]/20 
                  opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
                
                {/* Left border indicator with glow */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6d28d9] to-[#f472b6]
                  opacity-0 group-hover:opacity-100 rounded-r-lg transition-all duration-300
                  shadow-[0_0_10px_rgba(109,40,217,0.5)]"></div>

                {/* Icon with floating animation */}
                <div className="relative">
                  <item.icon className="h-5 w-5 text-[#94a3b8] group-hover:text-[#6d28d9]
                    transition-all duration-300 group-hover:scale-110 transform" />
                </div>

                {/* Label with gradient text effect */}
                <span className="relative font-medium text-[#94a3b8] group-hover:text-transparent 
                  group-hover:bg-gradient-to-r group-hover:from-[#6d28d9] group-hover:to-[#f472b6]
                  group-hover:bg-clip-text transition-all duration-300">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;