import React, { useState } from "react";
import { aiService } from "../services/appServices";
import { Bot, Send, Sparkles, User, HelpCircle, MessageSquare } from "lucide-react";

export default function AIMentor() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your **BTechPath AI Mentor** 🎓.\n\nAsk me anything about your 4-year engineering roadmap, subject choices, project ideas, or placement prep!"
    }
  ]);

  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const QUICK_PROMPTS = [
    "What should I learn next?",
    "I'm in 2nd year CSE. What should I focus on?",
    "Should I learn Python or Java?",
    "Give me a 2-hour study plan.",
    "Explain SQL JOIN simply.",
    "What project should I build?"
  ];

  const handleSend = async (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim() || loading) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInputMsg("");
    setLoading(true);

    try {
      const res = await aiService.sendMessage(text);
      if (res && res.response) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: res.response.reply }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I'm temporarily experiencing high traffic. Please check our Learning Hub or try asking again!" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>Interactive Student AI Mentor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          BTechPath <span className="gradient-text">AI Mentor Assistant</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Get instant guidance on what to learn next, daily study plans, and simplified tech breakdowns.
        </p>
      </div>

      {/* Quick Prompt Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {QUICK_PROMPTS.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white text-xs font-medium whitespace-nowrap transition-all"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col h-[550px] overflow-hidden">
        
        {/* Messages Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${m.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                m.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-glow"
              }`}>
                {m.sender === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div className={`p-4 rounded-3xl max-w-[80%] text-xs sm:text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-blue-600 text-white font-medium"
                  : "bg-slate-950/80 border border-slate-800 text-slate-200 whitespace-pre-wrap"
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 text-xs text-slate-400 italic flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span>AI Mentor is crafting guidance...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask your AI Mentor a question..."
              className="flex-1 p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !inputMsg.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 text-white shadow-glow transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
