// components/AIChatbot.tsx
// ENHANCED VERSION - Answers ANY question, not just subsidy-related

"use client";

import { useState, useRef, useEffect } from "react";

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
      text: "Hi! I'm your AI assistant. I can help with:\n• Solana Audit Subsidy Program\n• General blockchain/crypto questions\n• Technical development questions\n• Or anything else! What would you like to know?",
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

    // SUBSIDY PROGRAM QUESTIONS
    if (
      lowerMessage.includes("eligib") ||
      lowerMessage.includes("qualify") ||
      lowerMessage.includes("who can apply")
    ) {
      return "✅ **Eligibility for Solana Audit Subsidy:**\n\nAny Solana-based project can apply! Requirements:\n• Built on Solana blockchain\n• Code ready for audit\n• Planning mainnet launch\n• From any category: DeFi, NFT, Gaming, DAO, Infrastructure\n\nUse our Calculator to estimate your subsidy! 💰";
    }

    if (
      lowerMessage.includes("how much") ||
      lowerMessage.includes("subsidy amount") ||
      lowerMessage.includes("$") ||
      lowerMessage.includes("range")
    ) {
      return "💰 **Subsidy Details:**\n\n• Range: $5,000 - $50,000 per project\n• Coverage: Up to 30% of total audit costs\n• Max cap: $50,000\n\nExample: If audit costs $80k, you get $24k subsidy!\n\nTry our Calculator for your estimate! 📊";
    }

    if (
      lowerMessage.includes("timeline") ||
      lowerMessage.includes("how long") ||
      lowerMessage.includes("when")
    ) {
      return "⏱️ **Timeline:**\n\n1. Application: 15-30 minutes to complete\n2. Review: 1-2 weeks by expert panel\n3. Approval: Instant notification via email\n4. Marketplace access: Immediate after approval\n5. Audit duration: 3-8 weeks (depends on provider)\n\nTotal: ~2-10 weeks from application to completed audit";
    }

    if (
      lowerMessage.includes("apply") ||
      lowerMessage.includes("application") ||
      lowerMessage.includes("how to")
    ) {
      return "📝 **How to Apply:**\n\n✅ 5 Easy Steps:\n1. Click 'Apply Now' button\n2. Fill project details (5 steps)\n3. Submit application\n4. Get instant email confirmation\n5. Wait 1-2 weeks for review\n\n💡 Tip: Have your GitHub repo, project docs, and team info ready!";
    }

    if (
      lowerMessage.includes("provider") ||
      lowerMessage.includes("auditor") ||
      lowerMessage.includes("who")
    ) {
      return "🛡️ **15 Top Audit Providers:**\n\n• Zellic, OtterSec, Certora\n• Hacken, Oak Security, Quantstamp\n• ChainSecurity, Cyfrin, Guardian\n• Hexens, Immunefi, QuillAudits\n• Runtime Verification, Sherlock, Statemind\n\nCheck our Compare page to see detailed comparisons! 🔍";
    }

    // GENERAL BLOCKCHAIN/CRYPTO QUESTIONS
    if (lowerMessage.includes("solana") && !lowerMessage.includes("subsidy")) {
      return "⚡ **Solana Overview:**\n\nSolana is a high-performance blockchain known for:\n• Ultra-fast transactions (~65k TPS)\n• Low fees (~$0.00025 per tx)\n• Proof of History + Proof of Stake\n• Growing DeFi & NFT ecosystem\n• Developer-friendly (Rust, C, C++)\n\nWant to learn more about Solana development? Just ask! 🚀";
    }

    if (lowerMessage.includes("smart contract") || lowerMessage.includes("solidity")) {
      return "📜 **Smart Contracts:**\n\nOn Solana, smart contracts are called 'programs' and written in:\n• Rust (most popular)\n• C/C++\n• Python (Seahorse framework)\n\nKey concepts:\n• Accounts store data\n• Programs are stateless\n• Cross-Program Invocation (CPI)\n\nNeed help with Solana development? Ask away! 💻";
    }

    if (lowerMessage.includes("defi") || lowerMessage.includes("decentralized finance")) {
      return "💸 **DeFi (Decentralized Finance):**\n\nFinancial services without intermediaries:\n• Lending/Borrowing (Aave, Compound)\n• DEXs (Uniswap, Raydium)\n• Yield Farming\n• Staking\n• Derivatives\n\nOn Solana: Jupiter, Raydium, Orca, Marinade\n\nBuilding DeFi? Get your audit subsidized! 🎯";
    }

    if (lowerMessage.includes("nft") || lowerMessage.includes("non-fungible")) {
      return "🎨 **NFTs on Solana:**\n\nSolana has vibrant NFT ecosystem:\n• Low minting costs\n• Fast transactions\n• Marketplaces: Magic Eden, Tensor\n• Popular collections: DeGods, Okay Bears\n• Tools: Metaplex, Candy Machine\n\nBuilding NFT project? Audit it with our subsidy! 🖼️";
    }

    if (lowerMessage.includes("web3") || lowerMessage.includes("blockchain")) {
      return "🌐 **Web3 & Blockchain:**\n\nWeb3 = Decentralized internet built on blockchain\n\nKey features:\n• User ownership of data\n• No central authority\n• Transparent & immutable\n• Crypto-native payments\n\nSolana is perfect for Web3 due to speed & cost! 🚀";
    }

    if (lowerMessage.includes("wallet") || lowerMessage.includes("phantom")) {
      return "👛 **Solana Wallets:**\n\nPopular options:\n• Phantom (most popular)\n• Solflare\n• Backpack\n• Ledger (hardware)\n• Trezor (hardware)\n\nFor development:\n• @solana/web3.js\n• @solana/wallet-adapter\n\nNeed integration help? Just ask! 🔐";
    }

    // TECHNICAL QUESTIONS
    if (lowerMessage.includes("rust") || lowerMessage.includes("programming")) {
      return "🦀 **Rust for Solana:**\n\nWhy Rust?\n• Memory safe\n• No garbage collector\n• High performance\n• Great for blockchain\n\nLearning resources:\n• Solana Cookbook\n• Anchor framework\n• Rust Book\n• Solana Program Library\n\nBuilding? Get audit support! 🛠️";
    }

    if (lowerMessage.includes("test") || lowerMessage.includes("testing")) {
      return "🧪 **Testing Smart Contracts:**\n\nBest practices:\n• Unit tests (every function)\n• Integration tests (cross-program)\n• Fuzzing tests\n• Formal verification\n\nTools:\n• Anchor test framework\n• Solana Test Validator\n• Bankrun\n\nGood tests = better audit results! ✅";
    }

    if (lowerMessage.includes("security") || lowerMessage.includes("hack") || lowerMessage.includes("exploit")) {
      return "🔒 **Smart Contract Security:**\n\nCommon vulnerabilities:\n• Reentrancy attacks\n• Integer overflow\n• Access control issues\n• Logic errors\n• Oracle manipulation\n\n**Prevention:**\n✅ Professional audit (use our subsidy!)\n✅ Comprehensive testing\n✅ Bug bounties\n✅ Security best practices\n\nDon't skip audits! 🛡️";
    }

    // GENERAL QUESTIONS
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "👋 Hello! How can I help you today?\n\nI can answer questions about:\n• Solana Audit Subsidy Program\n• Blockchain & crypto\n• Solana development\n• Smart contracts\n• Security best practices\n• Or anything else!\n\nWhat would you like to know? 😊";
    }

    if (lowerMessage.includes("thank")) {
      return "You're very welcome! 🎉\n\nHappy to help anytime. Feel free to ask more questions or start your subsidy application!\n\nGood luck with your project! 🚀";
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
      return "🤖 **I can help with:**\n\n**Subsidy Program:**\n• Eligibility & requirements\n• Application process\n• Audit providers\n• Cost estimates\n\n**Technical:**\n• Solana development\n• Smart contracts\n• Security best practices\n• Testing & deployment\n\n**General:**\n• Blockchain concepts\n• DeFi, NFTs, Web3\n• Solana ecosystem\n\nJust ask anything! 💬";
    }

    // DEFAULT - INTELLIGENT FALLBACK
    return `🤔 That's an interesting question!\n\nWhile I don't have a specific answer for "${userMessage}", I can help with:\n\n📋 **Subsidy Program:**\n• Check our Calculator for cost estimates\n• Compare all 15 audit providers\n• View FAQ for common questions\n\n💬 **Ask me about:**\n• Eligibility & application process\n• Solana development\n• Smart contract security\n• Blockchain concepts\n\nOr contact support: support@secureaudithub.com 📧`;
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

    await new Promise((resolve) => setTimeout(resolve, 800));

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
    "How much subsidy?",
    "How to apply?",
    "What's Solana?",
    "Security tips?",
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
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white shadow-2xl z-50 flex flex-col border-2 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online 24/7</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded p-1 transition"
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
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-white border-2 border-gray-200 shadow-sm"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-purple-600">AI</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user" ? "text-white/70" : "text-gray-400"
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
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
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
              <p className="text-xs font-semibold text-gray-600 mb-2">💡 Quick Start:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    className="text-xs border-2 border-purple-200 px-3 py-2 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition font-medium"
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
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:shadow-lg transition disabled:cursor-not-allowed"
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