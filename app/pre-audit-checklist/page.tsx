// app/pre-audit-checklist/page.tsx
// FIXED VERSION - All issues resolved

"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  Shield,
  FileCode,
  Target,
  Download,
  Share2,
  ArrowRight,
  Zap,
  Lock,
  TestTube,
} from "lucide-react";
import { motion } from "framer-motion";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium";
  resources?: string[];
}

export default function PreAuditChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showShareMenu, setShowShareMenu] = useState(false);

  const checklistItems: ChecklistItem[] = [
    // TESTING
    {
      id: "test-1",
      category: "Testing",
      title: "Comprehensive Unit Tests",
      description: "Write unit tests for every function with 80%+ code coverage. Test all edge cases, error conditions, and success paths.",
      priority: "critical",
      resources: ["Anchor Testing Framework", "Solana Test Validator"],
    },
    {
      id: "test-2",
      category: "Testing",
      title: "Integration Tests",
      description: "Test interactions between multiple programs and accounts. Verify cross-program invocations (CPI) work correctly.",
      priority: "critical",
      resources: ["Bankrun", "Solana Program Library Tests"],
    },
    {
      id: "test-3",
      category: "Testing",
      title: "Fuzzing Tests",
      description: "Implement fuzzing over instruction sequences to discover unexpected state transitions and edge cases.",
      priority: "high",
      resources: ["Trident Fuzzer", "Honggfuzz"],
    },
    {
      id: "test-4",
      category: "Testing",
      title: "Negative Test Cases",
      description: "Test that unauthorized actions fail gracefully. Verify all access control mechanisms reject invalid requests.",
      priority: "high",
    },

    // INVARIANTS
    {
      id: "inv-1",
      category: "Invariants",
      title: "Document System Invariants",
      description: "Explicitly document all invariants: properties that must ALWAYS be true (e.g., 'total supply equals sum of balances').",
      priority: "critical",
      resources: ["Formal Verification Guide"],
    },
    {
      id: "inv-2",
      category: "Invariants",
      title: "Verify Mathematical Properties",
      description: "Ensure calculations are overflow-safe, division handles zero correctly, and rounding doesn't accumulate errors.",
      priority: "critical",
    },
    {
      id: "inv-3",
      category: "Invariants",
      title: "State Transition Validation",
      description: "Verify all state transitions are valid. Document allowed transitions and ensure code enforces them.",
      priority: "high",
    },
    {
      id: "inv-4",
      category: "Invariants",
      title: "Reentrancy Protection",
      description: "Ensure no reentrancy vulnerabilities exist. Use checks-effects-interactions pattern where applicable.",
      priority: "critical",
    },

    // CODE QUALITY
    {
      id: "code-1",
      category: "Code Quality",
      title: "Remove Dead Code",
      description: "Delete unused functions, commented-out code, and obsolete imports. Keep codebase clean and minimal.",
      priority: "medium",
    },
    {
      id: "code-2",
      category: "Code Quality",
      title: "Meaningful Variable Names",
      description: "Use descriptive names for variables, functions, and accounts. Avoid single letters except for loops.",
      priority: "medium",
    },
    {
      id: "code-3",
      category: "Code Quality",
      title: "Comprehensive Comments",
      description: "Document complex logic, explain WHY (not just what), and add NatSpec-style comments to all public functions.",
      priority: "high",
    },
    {
      id: "code-4",
      category: "Code Quality",
      title: "Error Messages",
      description: "Provide clear, specific error messages. Each error should indicate what failed and why.",
      priority: "high",
    },

    // SECURITY
    {
      id: "sec-1",
      category: "Security",
      title: "Access Control Checks",
      description: "Verify all privileged operations check proper authority. Use Anchor's has_one and constraint macros.",
      priority: "critical",
      resources: ["Anchor Security Best Practices"],
    },
    {
      id: "sec-2",
      category: "Security",
      title: "Account Validation",
      description: "Validate all account inputs: check ownership, verify PDAs, ensure accounts are initialized correctly.",
      priority: "critical",
    },
    {
      id: "sec-3",
      category: "Security",
      title: "Integer Overflow Protection",
      description: "Use checked arithmetic everywhere. Never allow unchecked additions, multiplications, or subtractions.",
      priority: "critical",
      resources: ["Rust Checked Math"],
    },
    {
      id: "sec-4",
      category: "Security",
      title: "Signer Verification",
      description: "Always verify signers before executing privileged operations. Check is_signer flag on accounts.",
      priority: "critical",
    },

    // DOCUMENTATION
    {
      id: "doc-1",
      category: "Documentation",
      title: "README with Setup Instructions",
      description: "Provide clear build and deployment instructions. Include all dependencies and environment setup.",
      priority: "high",
    },
    {
      id: "doc-2",
      category: "Documentation",
      title: "Architecture Documentation",
      description: "Document program architecture, account structures, and instruction flow. Include diagrams if complex.",
      priority: "high",
    },
    {
      id: "doc-3",
      category: "Documentation",
      title: "Known Issues List",
      description: "Document any known limitations, assumptions, or areas of concern. Transparency helps auditors focus.",
      priority: "medium",
    },

    // DEPLOYMENT
    {
      id: "dep-1",
      category: "Deployment",
      title: "Deployment Scripts",
      description: "Provide automated deployment scripts. Include initialization sequences and migration procedures.",
      priority: "medium",
    },
    {
      id: "dep-2",
      category: "Deployment",
      title: "Upgrade Mechanism",
      description: "If using upgradeable programs, document upgrade authority and procedures. Plan for emergency upgrades.",
      priority: "high",
    },
  ];

  const categories = ["Testing", "Invariants", "Code Quality", "Security", "Documentation", "Deployment"];

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const getCategoryProgress = (category: string) => {
    const categoryItems = checklistItems.filter((item) => item.category === category);
    const checkedCount = categoryItems.filter((item) => checkedItems.has(item.id)).length;
    return Math.round((checkedCount / categoryItems.length) * 100);
  };

  const overallProgress = Math.round((checkedItems.size / checklistItems.length) * 100);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  // FIXED: Export as PDF using browser print
  const exportAsPDF = () => {
    window.print();
  };

  // FIXED: Share functionality
  const handleShare = async (platform: string) => {
    const shareText = `📋 My Pre-Audit Checklist Progress: ${overallProgress}%

I'm preparing my Solana program for audit using SecureAuditHub's comprehensive checklist!

Progress:
${categories.map(cat => `${cat}: ${getCategoryProgress(cat)}%`).join('\n')}

Check it out: https://secure-audit-hub.vercel.app/pre-audit-checklist

#Solana #Web3Security`;

    const shareUrl = 'https://secure-audit-hub.vercel.app/pre-audit-checklist';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=My Pre-Audit Checklist Progress&body=${encodeURIComponent(shareText)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText);
        alert('✅ Progress copied to clipboard!');
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Pre-Audit Checklist Progress',
              text: shareText,
              url: shareUrl,
            });
          } catch (err) {
            console.log('Share cancelled');
          }
        }
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* FIXED: Header - Better text wrapping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
            <Shield className="w-4 h-4 mr-2" />
            Pre-Audit Preparation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 px-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent break-words">
              Pre-Audit Hardening Checklist
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Prepare your Solana program for audit with this comprehensive checklist. 
           
          </p>
        </motion.div>

        {/* Progress Overview */}
        <Card className="p-8 mb-8 border-2 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Overall Progress</h2>
            <span className="text-4xl font-bold text-green-600">{overallProgress}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {checkedItems.size} of {checklistItems.length} items completed
          </p>
        </Card>

        {/* FIXED: Action Buttons with Share Menu */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <Button
            onClick={exportAsPDF}
            className="bg-gradient-to-r from-green-600 to-blue-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as PDF
          </Button>
          
          <div className="relative">
            <Button 
              variant="outline"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Progress
            </Button>
            
            {showShareMenu && (
              <div className="absolute top-full mt-2 left-0 bg-white border-2 rounded-lg shadow-xl z-50 w-56 p-2">
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded flex items-center gap-3"
                >
                  <span className="text-2xl">🐦</span>
                  <span className="font-medium">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded flex items-center gap-3"
                >
                  <span className="text-2xl">💼</span>
                  <span className="font-medium">LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full text-left px-4 py-3 hover:bg-green-50 rounded flex items-center gap-3"
                >
                  <span className="text-2xl">💬</span>
                  <span className="font-medium">WhatsApp</span>
                </button>
                <button
                  onClick={() => handleShare('telegram')}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded flex items-center gap-3"
                >
                  <span className="text-2xl">✈️</span>
                  <span className="font-medium">Telegram</span>
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded flex items-center gap-3"
                >
                  <span className="text-2xl">📧</span>
                  <span className="font-medium">Email</span>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full text-left px-4 py-3 hover:bg-purple-50 rounded flex items-center gap-3"
                >
                  <span className="text-2xl">📋</span>
                  <span className="font-medium">Copy Link</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Progress */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => {
            const progress = getCategoryProgress(category);
            return (
              <Card key={category} className="p-4 border-2 text-center">
                <p className="font-semibold text-sm mb-2">{category}</p>
                <p className="text-2xl font-bold text-green-600">{progress}%</p>
              </Card>
            );
          })}
        </div>

        {/* Checklist by Category */}
        {categories.map((category) => {
          const items = checklistItems.filter((item) => item.category === category);
          const Icon = category === "Testing" ? TestTube :
                      category === "Invariants" ? Target :
                      category === "Security" ? Lock :
                      category === "Code Quality" ? FileCode :
                      category === "Documentation" ? FileCode : Zap;

          return (
            <Card key={category} className="p-8 mb-8 border-2">
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold">{category}</h2>
                <Badge className="ml-auto bg-green-100 text-green-700">
                  {items.filter((item) => checkedItems.has(item.id)).length}/{items.length}
                </Badge>
              </div>

              <div className="space-y-4">
                {items.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                        isChecked ? "bg-green-50 border-green-300" : "bg-white border-gray-200 hover:border-green-200"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {isChecked ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className={`font-bold text-lg ${isChecked ? "line-through text-gray-500" : ""}`}>
                              {item.title}
                            </h3>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{item.description}</p>
                          {item.resources && (
                            <div className="flex gap-2 flex-wrap">
                              {item.resources.map((resource) => (
                                <Badge key={resource} variant="outline" className="text-xs">
                                  📚 {resource}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}

        {/* CTA */}
        <Card className="p-12 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready for Audit?</h2>
            <p className="text-xl mb-8 text-white/90">
              Once you've completed this checklist, you're ready to apply for the Solana Audit Subsidy Program!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8">
                  Calculate Audit Costs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/apply">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
                >
                  Apply for Subsidy
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Print Styles for PDF Export */}
      <style jsx global>{`
        @media print {
          body { background: white; }
          nav, .chatbot, button { display: none !important; }
          .container { box-shadow: none !important; }
          h1, h2, h3 { page-break-after: avoid; }
          .checklist-item { page-break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}