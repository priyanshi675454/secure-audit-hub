

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
      text: "Hi! I'm your AI assistant. I can help with:\n• Solana Audit Subsidy Program\n• Pre-Audit Checklist\n• General blockchain/crypto questions\n• Technical development questions\n\nWhat would you like to know?",
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

  // Add message with deduplication: remove previous identical message (same sender + same text)
  const addMessage = (message: Message) => {
    setMessages((prev) => {
      const filtered = prev.filter((m) => !(m.sender === message.sender && m.text.trim() === message.text.trim()));
      return [...filtered, message];
    });
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // PRE-AUDIT CHECKLIST QUESTIONS (NEW!)
    if (
      lowerMessage.includes("pre-audit") ||
      lowerMessage.includes("preaudit") ||
      lowerMessage.includes("checklist") ||
      lowerMessage.includes("prepare") ||
      lowerMessage.includes("preparation")
    ) {
      return "📋 **Pre-Audit Hardening Checklist:**\n\nOur comprehensive checklist helps you prepare for audit:\n\n**6 Categories:**\n• Testing (unit, integration, fuzzing)\n• Invariants (system properties)\n• Code Quality (clean code)\n• Security (access control, validation)\n• Documentation (README, architecture)\n• Deployment (scripts, upgrades)\n\n21 total items to complete!\n\n👉 Check it out: /pre-audit-checklist\n\nThis ensures auditors focus on protocol logic, not avoidable bugs! 🎯";
    }

    if (
      lowerMessage.includes("test") && 
      (lowerMessage.includes("how") || lowerMessage.includes("should"))
    ) {
      return "🧪 **Testing Best Practices:**\n\n1. **Unit Tests:** 80%+ code coverage, test every function\n2. **Integration Tests:** Test cross-program calls (CPI)\n3. **Fuzzing:** Use Trident or Honggfuzz for instruction sequences\n4. **Negative Tests:** Ensure unauthorized actions fail\n\nTools:\n• Anchor Testing Framework\n• Solana Test Validator\n• Bankrun\n\nSee full checklist at /pre-audit-checklist! ✅";
    }

    if (
      lowerMessage.includes("invariant") ||
      lowerMessage.includes("property")
    ) {
      return "🎯 **System Invariants:**\n\nInvariants are properties that must ALWAYS be true:\n\n**Examples:**\n• Total supply = sum of all balances\n• Only authorized accounts can mint\n• Math operations never overflow\n• State transitions are valid\n\n**Document these explicitly!**\n\nHelps auditors verify your protocol logic is sound.\n\nMore details: /pre-audit-checklist";
    }

    if (
      lowerMessage.includes("fuzz") ||
      lowerMessage.includes("fuzzing")
    ) {
      return "🔍 **Fuzzing for Solana:**\n\nFuzzing tests instruction sequences to find bugs:\n\n**Tools:**\n• Trident Fuzzer (Solana-specific)\n• Honggfuzz\n\n**What it does:**\n• Generates random instruction sequences\n• Discovers unexpected state transitions\n• Finds edge cases you missed\n\n**Why important:**\nCatches bugs that manual tests miss!\n\nLearn more: /pre-audit-checklist";
    }

    if (
      lowerMessage.includes("security") && 
      (lowerMessage.includes("check") || lowerMessage.includes("best"))
    ) {
      return "🔒 **Security Checklist:**\n\n**Critical items:**\n1. Access control on all privileged ops\n2. Validate ALL account inputs\n3. Use checked arithmetic (no overflow)\n4. Verify signers before execution\n\n**Use Anchor:**\n• has_one constraints\n• Account validation macros\n• Checked math operations\n\nFull security checklist: /pre-audit-checklist\n\nDon't skip these! 🛡️";
    }

    // SUBSIDY PROGRAM QUESTIONS
    if (
      lowerMessage.includes("eligib") ||
      lowerMessage.includes("qualify") ||
      lowerMessage.includes("who can apply")
    ) {
      return "✅ **Eligibility for Solana Audit Subsidy:**\n\nAny Solana-based project can apply!\n\n**Requirements:**\n• Built on Solana blockchain\n• Code ready for audit\n• Planning mainnet launch\n• Any category: DeFi, NFT, Gaming, DAO, Infrastructure\n\n**Pro tip:** Complete our Pre-Audit Checklist first!\n👉 /pre-audit-checklist\n\nThen use Calculator to estimate: /calculator 💰";
    }

    if (
      lowerMessage.includes("how much") ||
      lowerMessage.includes("subsidy amount") ||
      lowerMessage.includes("$") ||
      lowerMessage.includes("range")
    ) {
      return "💰 **Subsidy Details:**\n\n• Range: $5,000 - $50,000 per project\n• Coverage: Up to 30% of total audit costs\n• Max cap: $50,000\n\n**Example:**\nAudit costs $80k → You get $24k subsidy!\n\n**Before applying:**\n1. Complete Pre-Audit Checklist (/pre-audit-checklist)\n2. Use Calculator for estimate (/calculator)\n3. Compare providers (/compare)\n\nMaximize your chances! 🎯";
    }

    if (
      lowerMessage.includes("timeline") ||
      lowerMessage.includes("how long") ||
      lowerMessage.includes("when")
    ) {
      return "⏱️ **Timeline:**\n\n**Before Application:**\n• Complete Pre-Audit Checklist (2-4 weeks)\n• Prepare documentation\n\n**Application Process:**\n1. Submit: 15-30 minutes\n2. Review: 1-2 weeks\n3. Approval: Instant notification\n\n**Audit:**\n• Standard: 3-6 weeks\n• Expedited: 2-3 weeks\n• Emergency: < 2 weeks\n\n**Total:** 2-10 weeks from prep to completion\n\nStart early! 🚀";
    }

    if (
      lowerMessage.includes("apply") ||
      lowerMessage.includes("application") ||
      lowerMessage.includes("how to")
    ) {
      return "📝 **How to Apply:**\n\n**BEFORE YOU APPLY:**\n1. Complete Pre-Audit Checklist (/pre-audit-checklist)\n2. Calculate costs (/calculator)\n3. Compare providers (/compare)\n\n**APPLICATION STEPS:**\n1. Click 'Apply Now'\n2. Fill 5-step form\n3. Submit\n4. Get instant email\n5. Wait 1-2 weeks for review\n\n**Have ready:**\n• GitHub repo\n• Project docs\n• Team info\n\nBetter prep = better chances! ✅";
    }

    if (
      lowerMessage.includes("provider") ||
      lowerMessage.includes("auditor") ||
      lowerMessage.includes("who")
    ) {
      return "🛡️ **15 Top Audit Providers:**\n\n• Zellic, OtterSec, Certora\n• Hacken, Oak Security, Quantstamp\n• ChainSecurity, Cyfrin, Guardian\n• Hexens, Immunefi, QuillAudits\n• Runtime Verification, Sherlock, Statemind\n\n**Compare them:**\n👉 /compare\n\n**Choose based on:**\n• Specialization (DeFi, NFT, etc.)\n• Timeline\n• Pricing\n• Past projects\n\nGet quotes from 2-3 providers! 🔍";
    }

    // GENERAL BLOCKCHAIN/CRYPTO QUESTIONS
    if (lowerMessage.includes("solana") && !lowerMessage.includes("subsidy")) {
      return "⚡ **Solana Overview:**\n\nHigh-performance blockchain:\n• ~65k TPS (fast!)\n• ~$0.00025 per tx (cheap!)\n• Proof of History + PoS\n• Growing DeFi & NFT ecosystem\n• Dev-friendly (Rust, C, C++)\n\n**Building on Solana?**\n1. Complete Pre-Audit Checklist\n2. Get audit subsidy ($5k-$50k)\n3. Launch securely!\n\nWant to learn more? Just ask! 🚀";
    }

    if (lowerMessage.includes("smart contract") || lowerMessage.includes("solidity")) {
      return "📜 **Smart Contracts on Solana:**\n\nSolana programs (not contracts) written in:\n• Rust (most popular)\n• C/C++\n• Python (Seahorse)\n\n**Key concepts:**\n• Accounts store data\n• Programs are stateless\n• Cross-Program Invocation (CPI)\n\n**Before audit:**\nComplete Pre-Audit Checklist!\n👉 /pre-audit-checklist\n\nNeed development help? Ask away! 💻";
    }

    if (lowerMessage.includes("defi") || lowerMessage.includes("decentralized finance")) {
      return "💸 **DeFi (Decentralized Finance):**\n\nFinancial services without intermediaries:\n• Lending/Borrowing\n• DEXs (Decentralized Exchanges)\n• Yield Farming\n• Staking\n• Derivatives\n\n**Solana DeFi:**\nJupiter, Raydium, Orca, Marinade\n\n**Building DeFi?**\n1. Security is CRITICAL\n2. Complete Pre-Audit Checklist\n3. Get audit (use our subsidy!)\n\nDeFi = High risk if not secure! 🎯";
    }

    if (lowerMessage.includes("nft") || lowerMessage.includes("non-fungible")) {
      return "🎨 **NFTs on Solana:**\n\nVibrant NFT ecosystem:\n• Low minting costs\n• Fast transactions\n• Marketplaces: Magic Eden, Tensor\n• Popular: DeGods, Okay Bears\n• Tools: Metaplex, Candy Machine\n\n**Building NFT project?**\nEven NFT contracts need security!\n\n1. Pre-Audit Checklist (/pre-audit-checklist)\n2. Audit with subsidy\n3. Launch safely\n\nProtect your users! 🖼️";
    }

    if (lowerMessage.includes("web3") || lowerMessage.includes("blockchain")) {
      return "🌐 **Web3 & Blockchain:**\n\nWeb3 = Decentralized internet on blockchain\n\n**Key features:**\n• User ownership of data\n• No central authority\n• Transparent & immutable\n• Crypto-native payments\n\n**Solana for Web3:**\n• Fast & cheap\n• Developer-friendly\n• Growing ecosystem\n\n**Building Web3?**\nSecurity matters! Check our Pre-Audit Checklist! 🚀";
    }

    if (lowerMessage.includes("wallet") || lowerMessage.includes("phantom")) {
      return "👛 **Solana Wallets:**\n\n**Popular:**\n• Phantom (most used)\n• Solflare\n• Backpack\n• Ledger (hardware)\n• Trezor (hardware)\n\n**For development:**\n• @solana/web3.js\n• @solana/wallet-adapter\n\n**Security tip:**\nAlways validate wallet signatures in your program!\n\nSee Security checklist: /pre-audit-checklist 🔐";
    }

    // TECHNICAL QUESTIONS
    if (lowerMessage.includes("rust") || lowerMessage.includes("programming")) {
      return "🦀 **Rust for Solana:**\n\n**Why Rust?**\n• Memory safe\n• No garbage collector\n• High performance\n• Perfect for blockchain\n\n**Learning:**\n• Solana Cookbook\n• Anchor framework\n• Rust Book\n• Solana Program Library\n\n**Before audit:**\nFollow best practices in Pre-Audit Checklist!\n👉 /pre-audit-checklist\n\nBuilding? Get audit support! 🛠️";
    }

    if (
      (lowerMessage.includes("access") && lowerMessage.includes("control")) ||
      lowerMessage.includes("authorization")
    ) {
      return "🔐 **Access Control:**\n\n**CRITICAL for security!**\n\n**Best practices:**\n• Use Anchor's has_one\n• Add constraint macros\n• Verify signer flag\n• Check account ownership\n\n**Common mistakes:**\n• Missing authority checks\n• Not verifying signers\n• Improper PDA validation\n\n**Full checklist:**\n👉 /pre-audit-checklist (Security section)\n\nDon't skip this! 🛡️";
    }

    // GENERAL QUESTIONS
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "👋 Hello! How can I help you today?\n\n**I can answer questions about:**\n• Solana Audit Subsidy Program\n• Pre-Audit Checklist (NEW!)\n• Blockchain & crypto\n• Solana development\n• Smart contracts & security\n• Or anything else!\n\n**Quick links:**\n• Pre-Audit Checklist: /pre-audit-checklist\n• Cost Calculator: /calculator\n• Compare Providers: /compare\n\nWhat would you like to know? 😊";
    }

    if (lowerMessage.includes("thank")) {
      return "You're very welcome! 🎉\n\nHappy to help anytime. Remember:\n\n1. Complete Pre-Audit Checklist first\n2. Then apply for subsidy\n3. Get better audit results!\n\nGood luck with your project! 🚀";
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
      return "🤖 **I can help with:**\n\n**Subsidy Program:**\n• Eligibility & requirements\n• Application process\n• Audit providers\n• Cost estimates\n\n**Pre-Audit Prep (NEW!):**\n• Testing best practices\n• Security checklist\n• Code quality standards\n• Documentation requirements\n\n**Technical:**\n• Solana development\n• Smart contracts\n• Security practices\n• Testing & deployment\n\n**General:**\n• Blockchain concepts\n• DeFi, NFTs, Web3\n\nJust ask anything! 💬";
    }

    // DEFAULT - INTELLIGENT FALLBACK
    return `🤔 That's an interesting question!\n\nWhile I don't have a specific answer, I can help with:\n\n📋 **New! Pre-Audit Checklist:**\nPrepare your code before audit\n👉 /pre-audit-checklist\n\n💰 **Cost Calculator:**\nEstimate your audit costs\n👉 /calculator\n\n🔍 **Provider Comparison:**\nCompare all 15 auditors\n👉 /compare\n\n💬 **Ask me about:**\n• Solana development\n• Security best practices\n• Testing strategies\n• Subsidy program\n\nOr contact: secureaudithub@gmail.com 📧`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    // Add with dedupe (remove previous identical user message)
    addMessage(userMessage);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(input),
      sender: "bot",
      timestamp: new Date(),
    };
    // Add bot message with dedupe (remove previous identical bot message)
    addMessage(botResponse);
    setIsTyping(false);
  };

  const quickQuestions = [
    "Pre-Audit Checklist?",
    "How much subsidy?",
    "Security tips?",
    "How to apply?",
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