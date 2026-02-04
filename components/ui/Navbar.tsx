"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Audit-Checklist", href: "/pre-audit-checklist" },
    { name: "Providers", href: "/providers" },
    { name: "Compare Providers", href: "/compare" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Resources", href: "/resources" },
    { name: "FAQ", href: "/faq" },
  ];

  // Deduplicate links by href, keeping the last occurrence
  const uniqueNavLinks = Array.from(
    new Map(navLinks.map((link) => [link.href, link])).values()
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO SECTION - Brand stays here */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-solana-purple group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-solana-purple/20 blur-xl group-hover:blur-2xl transition-all" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent mr-4">
              SecureAuditHub
            </span>
          </Link>

          {/* DESKTOP NAV - centered links with CTA on the right */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-8">
            {uniqueNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-solana-purple dark:hover:text-solana-green transition-colors font-medium flex items-center gap-2 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center ml-6">
            <Link href="/apply">
              <Button className="bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 transition-opacity shadow-md">
                Get Started
              </Button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-6 space-y-4">
            {uniqueNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
            <Link href="/apply" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}