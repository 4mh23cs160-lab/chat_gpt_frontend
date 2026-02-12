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
          <Link to="/" className="flex items-center gap-3 group text-white decoration-none hover:no-underline">
            <div className="relative h-10 w-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md group-hover:bg-blue-500/30 transition-all duration-300"></div>
              <div className="relative h-10 w-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-50 animate-pulse"></div>
                <svg className="h-6 w-6 text-white relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                NovaCore
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-[0.3em] uppercase -mt-1">Neural Core</span>
            </div>
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
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:scale-[1.02] decoration-none hover:no-underline"
                >
                  Sign up
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