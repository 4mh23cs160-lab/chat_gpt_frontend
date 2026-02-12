import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/ask", {
        message: input,
      });

      const aiMessage = { role: "assistant", content: response.data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting to the server. ❌" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-10 px-4">
      {/* Header / Empty State */}
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            What can I help with?
          </h1>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-2xl overflow-y-auto mb-6 space-y-6 px-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user"
                  ? "bg-gray-100 text-gray-800"
                  : "text-gray-800"
                  }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-2 text-gray-400">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input section */}
      <div className="w-full max-w-xl sticky bottom-0 bg-white pb-4">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="flex items-center gap-2 border border-gray-300 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-gray-300 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              disabled={loading}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 disabled:bg-transparent"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30"
            >
              <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Suggestion buttons (only in empty state) */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {["Search", "Study", "Create image", "Write code"].map((item) => (
              <button
                key={item}
                onClick={() => setInput(item)}
                className="px-4 py-1.5 text-sm border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition whitespace-nowrap"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Footer text */}
        <p className="text-[10px] text-gray-400 mt-4 text-center">
          By messaging PixelAI, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Home;