import React from 'react';
import { Link } from '@tanstack/react-router';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-white/20 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
        <Link 
          to="/" 
          className="bg-gradient-to-r from-gray-800 to-gray-600 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Home
        </Link>

        <div className="flex space-x-4 items-center">
          <Link 
            to="/auth"
            search={{ mode: 'login' }}
            className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
          >
            Login
          </Link>
          <Link 
            to="/auth"
            search={{ mode: 'signup' }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 transform active:translate-y-0"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex flex-col cursor-pointer p-2">
          <span className="w-6 h-0.5 bg-gray-700 mb-1 rounded"></span>
          <span className="w-6 h-0.5 bg-gray-700 mb-1 rounded"></span>
          <span className="w-6 h-0.5 bg-gray-700 rounded"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;