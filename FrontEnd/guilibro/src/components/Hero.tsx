import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-[500px] rounded-2xl overflow-hidden mt-20 mx-auto">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 transform transition-transform duration-500 hover:scale-110">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000&h=800"
          alt="Library"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/90 via-[#0a0f1e]/70 to-transparent">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="gradient-text">Discover</span>{' '}
              <span className="text-white">Your Next Great</span>{' '}
              <span className="gradient-text">Read</span>
            </h1>
            
            <p className="text-lg text-[#94a3b8] leading-relaxed">
              Explore thousands of books from contemporary bestsellers to timeless classics.
              Your journey through countless worlds begins here.
            </p>

            {/* CTA Button with Hover Effect */}
            <div className="relative group inline-block">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6d28d9] to-[#f472b6] 
                blur group-hover:blur-md transition-all duration-300 opacity-70"></div>
              
              {/* Button */}
              <button className="relative px-8 py-4 rounded-lg bg-gradient-to-r from-[#6d28d9] to-[#f472b6] 
                text-white font-semibold text-lg transform transition-all duration-300 
                hover:scale-105 hover:shadow-lg hover:shadow-[#6d28d9]/50 flex items-center gap-2 group">
                Start Reading
                <ChevronRight className="w-5 h-5 transform transition-transform duration-300 
                  group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Floating Book Icon */}
          <div className="absolute right-8 bottom-8">
            <div className="relative float-animation">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] to-[#f472b6] blur-xl opacity-50"></div>
              <BookOpen className="relative w-16 h-16 text-white transform hover:scale-110 
                transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// Add this to your globals.css
/*
@keyframes particle {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

.animate-particle {
  animation: particle 5s ease-in infinite;
}
*/