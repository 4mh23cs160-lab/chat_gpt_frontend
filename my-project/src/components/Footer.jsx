import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-sm">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">NovaCore</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs text-center md:text-left">
              The next generation of neural intelligence, built for researchers, creators, and developers.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Platform</h4>
              <a href="/" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors decoration-none">Home</a>
              <a href="/dashboard" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors decoration-none">Dashboard</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company</h4>
              <a href="/about" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors decoration-none">About</a>
              <a href="/contact" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors decoration-none">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} NovaCore Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.841 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer