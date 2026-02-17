import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Terminal, Check, Paperclip, Mic, MicOff, X, FileText, Volume2, VolumeX } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await axios.get(`${API_URL}/history/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const history = response.data.history.flatMap(h => [
          { role: "user", content: h.message },
          { role: "assistant", content: h.response }
        ]);
        setMessages(history);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const speak = (text) => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if ((!input.trim() && !selectedFile) || loading) return;

    let attachmentName = null;
    let attachmentUrl = null;

    if (selectedFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const uploadRes = await axios.post(`${API_URL}/attachments/upload`, formData);
        attachmentName = uploadRes.data.filename;
        attachmentUrl = uploadRes.data.url;
      } catch (error) {
        console.error("Upload error:", error);
        setMessages(prev => [...prev, { role: "assistant", content: "Failed to upload attachment. ❌" }]);
        setLoading(false);
        return;
      }
    }

    const userMessage = {
      role: "user",
      content: input,
      attachment_name: attachmentName,
      attachment_url: attachmentUrl
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSelectedFile(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      console.log(`DEBUG: Using API_URL: ${API_URL}`);
      console.log(`DEBUG: Token present: ${!!token}`);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(`${API_URL}/ask`, {
        message: input || (attachmentName ? `Attached file: ${attachmentName}` : ""),
        attachment_name: attachmentName,
        attachment_url: attachmentUrl
      }, { headers });

      const aiMessage = { role: "assistant", content: response.data.response };
      setMessages((prev) => [...prev, aiMessage]);
      speak(aiMessage.content);
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
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-between py-10 px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-20 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Header / Empty State */}
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            What can I help with?
          </h1>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-3xl overflow-y-auto mb-6 space-y-6 px-2 relative z-10 scrollbar-hide">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3 transition-all duration-300 ${msg.role === "user"
                  ? "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-100 shadow-lg"
                  : "bg-cyan-500/10 border border-cyan-500/20 text-gray-200"
                  }`}
              >
                {msg.attachment_url && (
                  <div className="mb-3">
                    {msg.attachment_name?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                      <img
                        src={msg.attachment_url}
                        alt={msg.attachment_name}
                        className="max-w-full rounded-lg border border-gray-700 max-h-60 object-contain"
                      />
                    ) : (
                      <a
                        href={msg.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-cyan-500/50 transition-colors text-cyan-400 text-sm"
                      >
                        <FileText size={16} />
                        <span className="truncate max-w-[200px]">{msg.attachment_name}</span>
                      </a>
                    )}
                  </div>
                )}
                <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl prose-code:text-cyan-400 prose-code:bg-transparent prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const [copied, setCopied] = React.useState(false);

                        const handleCopy = () => {
                          navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        };

                        return !inline ? (
                          <div className="relative group my-4">
                            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-gray-800 rounded-t-xl">
                              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                                <Terminal size={14} />
                                {match?.[1] || 'code'}
                              </div>
                              <button
                                onClick={handleCopy}
                                className="p-1 hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-white"
                              >
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                              </button>
                            </div>
                            <pre className="!mt-0 !rounded-t-none overflow-x-auto scrollbar-hide bg-gray-950/50 p-4">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        ) : (
                          <code className="bg-gray-800/50 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-sm" {...props}>
                            {children}
                          </code>
                        );
                      },
                      table({ children }) {
                        return (
                          <div className="my-6 overflow-x-auto border border-gray-800 rounded-xl">
                            <table className="w-full text-left border-collapse">
                              {children}
                            </table>
                          </div>
                        );
                      },
                      th({ children }) {
                        return <th className="px-4 py-3 bg-gray-900/50 font-bold border-b border-gray-800 text-gray-200">{children}</th>;
                      },
                      td({ children }) {
                        return <td className="px-4 py-3 border-b border-gray-800/50 text-gray-400">{children}</td>;
                      },
                      ul({ children }) {
                        return <ul className="list-disc pl-6 space-y-2 my-4 text-gray-300">{children}</ul>;
                      },
                      ol({ children }) {
                        return <ol className="list-decimal pl-6 space-y-2 my-4 text-gray-300">{children}</ol>;
                      }
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
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
      <div className="w-full max-w-2xl sticky bottom-0 bg-gray-950/80 backdrop-blur-md pb-6 relative z-10">
        <form onSubmit={handleSendMessage} className="relative">
          {selectedFile && (
            <div className="absolute bottom-full left-0 mb-4 p-2 bg-gray-900/90 border border-gray-800 rounded-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
              {selectedFile.type.startsWith('image/') ? (
                <div className="w-10 h-10 rounded border border-gray-700 overflow-hidden">
                  <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" />
                </div>
              ) : (
                <FileText className="text-cyan-400" size={20} />
              )}
              <span className="text-xs text-gray-300 max-w-[150px] truncate">{selectedFile.name}</span>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="p-1 hover:bg-gray-800 rounded-full text-gray-500 hover:text-red-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl px-4 py-4 shadow-2xl focus-within:ring-2 focus-within:ring-cyan-500/50 focus-within:border-cyan-500/50 transition-all group">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-lg text-gray-500 hover:text-cyan-400 hover:bg-gray-800 transition-all"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-500 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => {
                if (isRecording) {
                  recognitionRef.current?.stop();
                } else {
                  setIsRecording(true);
                  recognitionRef.current?.start();
                }
              }}
              className={`p-1.5 rounded-lg transition-all ${isRecording ? 'text-red-500 bg-red-500/10' : 'text-gray-500 hover:text-cyan-400 hover:bg-gray-800'}`}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button
              type="button"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={`p-1.5 rounded-lg transition-all ${isVoiceEnabled ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
            >
              {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              type="submit"
              disabled={loading || (!input.trim() && !selectedFile)}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-30 disabled:grayscale"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Suggestion buttons (only in empty state) */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {["Search", "Study", "Create image", "Write code"].map((item) => (
              <button
                key={item}
                onClick={() => setInput(item)}
                className="px-5 py-2 text-sm bg-gray-900/50 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 hover:border-cyan-500/30 transition-all whitespace-nowrap shadow-sm"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Footer text */}
        <p className="text-[11px] text-gray-600 mt-6 text-center tracking-wide">
          By messaging <span className="text-cyan-500 opacity-80">NovaCore</span>, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Home;