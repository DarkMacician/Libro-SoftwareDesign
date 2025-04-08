import React from 'react';
import { Home, BookOpen, Star, Clock, Heart, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#181A20] min-h-screen p-4 border-r border-[#2B2F36]">
      <nav>
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
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#2B2F36] text-gray-400 hover:text-[#F0B90B]"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;