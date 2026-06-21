//import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPaw, FaCamera, FaSearch, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold hover:scale-105 transition-transform">
            <FaPaw className="text-3xl" />
            <span>Wildlife eSearch</span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex gap-6">
            <li>
              <Link 
                to="/" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive('/') ? 'bg-white/30 font-semibold' : 'hover:bg-white/20'
                }`}
              >
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link 
                to="/camera" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive('/camera') ? 'bg-white/30 font-semibold' : 'hover:bg-white/20'
                }`}
              >
                <FaCamera /> Camera
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive('/search') ? 'bg-white/30 font-semibold' : 'hover:bg-white/20'
                }`}
              >
                <FaSearch /> Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;