// components/AIChatbot.tsx
// Simplified AI Chatbot - works without extra dependencies

"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Solana Audit Subsidy assistant. Ask me anything about the program, eligibility, or application process!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("eligib") ||
      lowerMessage.includes("qualify") ||
      lowerMessage.includes("who can apply")
    ) {
      return "Any Solana project can apply for the subsidy! Requirements include: (1) Being a Solana-based project, (2) Having code ready for audit, (3) Planning a mainnet launch. Projects from DeFi, NFT, Gaming, DAO, and Infrastructure are all welcome!";
    }

    if (
      lowerMessage.includes("how much") ||
      lowerMessage.includes("subsidy amount") ||
      lowerMessage.includes("$")
    ) {
      return "Subsidies range from $5,000 to $50,000 per project! You can get up to 30% coverage of your total audit costs. Use our Calculator tool to estimate your potential subsidy.";
    }

    if (
      lowerMessage.includes("when") ||
      lowerMessage.includes("timeline") ||
      lowerMessage.includes("how long")
    ) {
      return "The review process typically takes 1-2 weeks. Once approved, you'll be onboarded to the marketplace where you can receive offers from 15 participating audit providers.";
    }

    if (
      lowerMessage.includes("how to apply") ||
      lowerMessage.includes("application") ||
      lowerMessage.includes("process")
    ) {
      return "The application process has 5 easy steps: (1) Submit your project details, (2) Expert panel reviews your application, (3) Get approved with subsidy amount, (4) Access marketplace with audit offers, (5) Redeem subsidy voucher. Click 'Apply Now' to get started!";
    }

    if (
      lowerMessage.includes("provider") ||
      lowerMessage.includes("auditor") ||
      lowerMessage.includes("who audits")
    ) {
      return "We work with 15 top-tier audit providers: Zellic, OtterSec, Certora, Hacken, Oak Security, Quantstamp, ChainSecurity, Cyfrin, Guardian, Hexens, Immunefi, QuillAudits, Runtime Verification, Sherlock, and Statemind. Check our Providers page for detailed comparisons!";
    }

    if (
      lowerMessage.includes("partner") ||
      lowerMessage.includes("who runs") ||
      lowerMessage.includes("organizer")
    ) {
      return "This is a $1M joint initiative by Superteam, MonkeDAO, Jito, and Areta Market. These key Solana ecosystem stakeholders work together to support project security.";
    }

    if (
      lowerMessage.includes("redeem") ||
      lowerMessage.includes("voucher") ||
      lowerMessage.includes("how to use")
    ) {
      return "Once approved, you'll receive a Subsidy Voucher Code. When you select an audit offer from the marketplace, simply apply your voucher code to get up to 30% off (max $50,000) on your audit costs!";
    }

    if (lowerMessage.includes("cost") || lowerMessage.includes("price")) {
      return "Audit costs vary based on your project size and complexity, typically ranging from $40,000 to $150,000. With the subsidy, you can save $5,000 to $50,000! Use our Cost Calculator for a personalized estimate.";
    }

    return "Great question! Here are some helpful resources:\n\n📊 Use our Calculator to estimate costs\n🔍 Compare all 15 Providers\n📋 Check our FAQ page\n✉️ Contact support@secureaudithub.com\n\nWhat else would you like to know?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(input),
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const quickQuestions = [
    "How much subsidy can I get?",
    "How to apply?",
    "Who are the audit providers?",
    "What's the timeline?",
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center text-white"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white shadow-2xl z-50 flex flex-col border-2 rounded-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-white border-2 border-gray-200"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-purple-600">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-3 bg-white border-t">
              <p className="text-xs font-semibold text-gray-600 mb-2">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    className="text-xs border border-purple-300 px-2 py-1 rounded hover:bg-purple-50"
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}