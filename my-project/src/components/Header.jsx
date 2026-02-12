import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group text-white decoration-none hover:no-underline">
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              PixelAI
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors decoration-none hover:no-underline">Home</Link>
            <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors decoration-none hover:no-underline">About</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors decoration-none hover:no-underline">Contact</Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors border-l border-gray-800 pl-8 decoration-none hover:no-underline">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white px-4 transition-colors decoration-none hover:no-underline">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:scale-[1.02] decoration-none hover:no-underline"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;