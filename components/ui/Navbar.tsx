"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Providers", href: "/providers" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Resources", href: "/resources" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-solana-purple group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-solana-purple/20 blur-xl group-hover:blur-2xl transition-all" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent">
              SecureAuditHub
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-solana-purple dark:hover:text-solana-green transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/apply">
              <Button className="bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {link.name}
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