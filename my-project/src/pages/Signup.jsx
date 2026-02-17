import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful ✅");
        setFormData({ email: "", password: "" });
      } else {
        setMessage(data.detail || "Signup failed ❌");
      }

    } catch (error) {
      setMessage("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-20 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Join NovaCore to start your creative journey
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-black/20 border border-gray-800/60 sm:rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none block w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-cyan-500/25 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-xl text-center text-sm font-medium ${message.includes("✅")
              ? "bg-green-900/30 text-green-400 border border-green-800/50"
              : "bg-red-900/30 text-red-400 border border-red-800/50"
              }`}>
              {message}
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
