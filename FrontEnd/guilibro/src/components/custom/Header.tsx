import React from 'react';
import Link from 'next/link';

const Header = () => {
  const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Tin tức', href: '/news' },
    { label: 'Nạp số dư', href: '/deposit' },
    { label: 'Liên hệ', href: '/contact' },
  ];

  return (
    <div className="mt-3 shadow shadow-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
            <Link href="/" className="flex items-center">
            <span className="text-red-600 text-2xl font-bold">SachWeb.vn</span>
            </Link>
          {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
                <Link
                key={index}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                {item.label}
                </Link>
            ))}
            </nav>
            <div className="flex justify-center">
            <input
            type="text"
            placeholder="Nhập từ khóa cần tìm..."
            className="p-2 border border-gray-300 rounded "
            />
            <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
            Tìm kiếm
            </button>
        </div>

          {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
            <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
                Đăng nhập
            </Link>
            <Link
                href="/register"
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
                Đăng ký
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 p-2"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;