import React from 'react';

const About = () => {
  const features = [
    {
      title: "Advanced Reasoning",
      description: "Powered by state-of-the-art LLMs like GPT-4o-mini for complex problem solving.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Instant Creative",
      description: "Generate stunning images and creative copy in seconds with simple prompts.",
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
    {
      title: "Secure & Private",
      description: "Your data is encrypted and your conversations are private by design.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-20 px-4 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-cyan-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-cyan-500 font-semibold tracking-wide uppercase mb-3">About NovaCore</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            The future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">neural intelligence</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            We're on a mission to make advanced AI accessible, intuitive, and powerful for everyone, everywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="h-12 w-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-cyan-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Start creating with NovaCore today</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Join thousands of users who are already using NovaCore to boost their productivity and creativity.</p>
          <a href="/signup" className="inline-flex items-center px-8 py-3 rounded-2xl bg-white text-gray-950 font-bold hover:bg-gray-100 transition-colors shadow-xl shadow-white/10">
            Get Started for Free
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;