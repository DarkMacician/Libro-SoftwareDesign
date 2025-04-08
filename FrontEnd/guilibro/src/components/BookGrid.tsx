import React from 'react';

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=400',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300&h=400',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=300&h=400',
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300&h=400',
  },
];

const BookGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-[#181A20] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 border border-[#2B2F36]"
        >
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-1">{book.title}</h3>
            <p className="text-gray-400">{book.author}</p>
            <button className="mt-4 w-full bg-[#F0B90B] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#F0B90B]/80 transition-colors">
              Read Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;