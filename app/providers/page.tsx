"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Search,
  Star,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  DollarSign,
  Clock,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

interface Provider {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  specialties: string[];
  priceRange: string;
  avgDuration: string;
  projectsCompleted: number;
  description: string;
  website: string;
  featured: boolean;
}

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const providers: Provider[] = [
    {
      id: 1,
      name: "Adevar Labs Inc.",
      logo: "AL",
      rating: 4.9,
      reviews: 45,
      specialties: ["DeFi", "Smart Contracts", "Web3"],
      priceRange: "$15k - $50k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 120,
      description: "Leading security auditor specializing in Solana DeFi protocols with deep expertise in smart contract security.",
      website: "https://adevarlabs.com",
      featured: true,
    },
    {
      id: 2,
      name: "Certora",
      logo: "CE",
      rating: 4.8,
      reviews: 38,
      specialties: ["Formal Verification", "DeFi", "Smart Contracts"],
      priceRange: "$20k - $60k",
      avgDuration: "4-6 weeks",
      projectsCompleted: 95,
      description: "Pioneers in formal verification technology, ensuring mathematical certainty in smart contract security.",
      website: "https://certora.com",
      featured: true,
    },
    {
      id: 3,
      name: "ChainSecurity",
      logo: "CS",
      rating: 4.7,
      reviews: 42,
      specialties: ["Smart Contracts", "NFT", "Gaming"],
      priceRange: "$18k - $55k",
      avgDuration: "3-5 weeks",
      projectsCompleted: 110,
      description: "Comprehensive security audits with focus on Solana NFT and gaming ecosystems.",
      website: "https://chainsecurity.com",
      featured: false,
    },
    {
      id: 4,
      name: "Cyfrin",
      logo: "CY",
      rating: 4.9,
      reviews: 52,
      specialties: ["DeFi", "Infrastructure", "Protocols"],
      priceRange: "$12k - $45k",
      avgDuration: "2-4 weeks",
      projectsCompleted: 140,
      description: "Fast-growing audit firm known for thorough reviews and competitive pricing for Solana projects.",
      website: "https://cyfrin.io",
      featured: true,
    },
    {
      id: 5,
      name: "Guardian",
      logo: "GU",
      rating: 4.6,
      reviews: 35,
      specialties: ["Web3", "Smart Contracts", "DeFi"],
      priceRange: "$16k - $50k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 88,
      description: "Trusted security partner for emerging Solana projects with flexible engagement models.",
      website: "https://guardian.security",
      featured: false,
    },
    {
      id: 6,
      name: "Hacken",
      logo: "HA",
      rating: 4.7,
      reviews: 48,
      specialties: ["DeFi", "NFT", "Exchange"],
      priceRange: "$14k - $48k",
      avgDuration: "3-5 weeks",
      projectsCompleted: 125,
      description: "Comprehensive blockchain security services with deep Solana ecosystem experience.",
      website: "https://hacken.io",
      featured: false,
    },
    {
      id: 7,
      name: "Hexens",
      logo: "HE",
      rating: 4.8,
      reviews: 40,
      specialties: ["Smart Contracts", "DeFi", "Infrastructure"],
      priceRange: "$17k - $52k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 102,
      description: "Boutique security firm specializing in high-complexity Solana protocol audits.",
      website: "https://hexens.io",
      featured: false,
    },
    {
      id: 8,
      name: "Immunefi",
      logo: "IM",
      rating: 4.9,
      reviews: 55,
      specialties: ["Bug Bounty", "DeFi", "Security"],
      priceRange: "$10k - $40k",
      avgDuration: "2-3 weeks",
      projectsCompleted: 160,
      description: "Leading bug bounty platform combining audits with continuous security monitoring.",
      website: "https://immunefi.com",
      featured: true,
    },
    {
      id: 9,
      name: "Oak Security",
      logo: "OA",
      rating: 4.8,
      reviews: 44,
      specialties: ["Smart Contracts", "DeFi", "NFT"],
      priceRange: "$15k - $50k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 115,
      description: "Solana-native security experts with deep understanding of the ecosystem's unique challenges.",
      website: "https://oaksecurity.io",
      featured: true,
    },
    {
      id: 10,
      name: "Quantstamp",
      logo: "QU",
      rating: 4.7,
      reviews: 50,
      specialties: ["DeFi", "Smart Contracts", "Protocols"],
      priceRange: "$18k - $60k",
      avgDuration: "4-6 weeks",
      projectsCompleted: 130,
      description: "Industry veteran with extensive track record auditing major Solana protocols.",
      website: "https://quantstamp.com",
      featured: false,
    },
    {
      id: 11,
      name: "QuillAudits",
      logo: "QA",
      rating: 4.6,
      reviews: 36,
      specialties: ["Smart Contracts", "DeFi", "Web3"],
      priceRange: "$12k - $42k",
      avgDuration: "2-4 weeks",
      projectsCompleted: 92,
      description: "Cost-effective security audits with quick turnaround for growing Solana projects.",
      website: "https://quillaudits.com",
      featured: false,
    },
    {
      id: 12,
      name: "Runtime Verification",
      logo: "RV",
      rating: 4.9,
      reviews: 41,
      specialties: ["Formal Verification", "Protocols", "Infrastructure"],
      priceRange: "$22k - $65k",
      avgDuration: "4-6 weeks",
      projectsCompleted: 85,
      description: "Academic-backed formal verification ensuring highest levels of security guarantees.",
      website: "https://runtimeverification.com",
      featured: false,
    },
    {
      id: 13,
      name: "Sherlock",
      logo: "SH",
      rating: 4.8,
      reviews: 46,
      specialties: ["DeFi", "Insurance", "Security"],
      priceRange: "$16k - $54k",
      avgDuration: "3-5 weeks",
      projectsCompleted: 108,
      description: "Audit + insurance platform providing comprehensive security coverage for Solana projects.",
      website: "https://sherlock.xyz",
      featured: true,
    },
    {
      id: 14,
      name: "Statemind",
      logo: "ST",
      rating: 4.7,
      reviews: 39,
      specialties: ["Smart Contracts", "DeFi", "Infrastructure"],
      priceRange: "$14k - $48k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 98,
      description: "European security firm with strong Solana expertise and rigorous audit methodology.",
      website: "https://statemind.io",
      featured: false,
    },
    {
      id: 15,
      name: "Zellic",
      logo: "ZE",
      rating: 4.9,
      reviews: 58,
      specialties: ["Smart Contracts", "DeFi", "Infrastructure"],
      priceRange: "$20k - $58k",
      avgDuration: "3-5 weeks",
      projectsCompleted: 145,
      description: "Top-tier security auditor trusted by leading Solana protocols for comprehensive reviews.",
      website: "https://zellic.io",
      featured: true,
    },
  ];

  const specialties = ["All", "DeFi", "Smart Contracts", "NFT", "Gaming", "Infrastructure", "Web3"];

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || provider.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const featuredProviders = filteredProviders.filter(p => p.featured);
  const otherProviders = filteredProviders.filter(p => !p.featured);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
            <Shield className="w-4 h-4 mr-2" />
            15 Approved Providers
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
              Audit Provider
            </span>{" "}
            Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare all approved audit firms. Find the perfect match for your Solana project.
          </p>
        </motion.div>

        <Card className="p-6 mb-8 border-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={selectedSpecialty === specialty ? "bg-gradient-to-r from-purple-600 to-green-600" : ""}
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-purple-600">{filteredProviders.length}</span> providers
          </p>
        </div>

        {featuredProviders.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Providers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProviders.map((provider, index) => (
                <ProviderCard key={provider.id} provider={provider} index={index} />
              ))}
            </div>
          </div>
        )}

        {otherProviders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">All Providers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProviders.map((provider, index) => (
                <ProviderCard key={provider.id} provider={provider} index={index + featuredProviders.length} />
              ))}
            </div>
          </div>
        )}

        {filteredProviders.length === 0 && (
          <Card className="p-12 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No providers found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function ProviderCard({ provider, index }: { provider: Provider; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-6 border-2 hover:border-purple-300 transition-all card-hover h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {provider.logo}
            </div>
            <div>
              <h3 className="font-bold text-lg">{provider.name}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{provider.rating}</span>
                <span className="text-gray-500">({provider.reviews})</span>
              </div>
            </div>
          </div>
          {provider.featured && (
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
              Featured
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {provider.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {provider.description}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-t border-b">
          <div className="text-center">
            <DollarSign className="w-4 h-4 text-green-500 mx-auto mb-1" />
            <div className="text-xs text-gray-600">{provider.priceRange}</div>
          </div>
          <div className="text-center">
            <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <div className="text-xs text-gray-600">{provider.avgDuration}</div>
          </div>
          <div className="text-center">
            <CheckCircle2 className="w-4 h-4 text-purple-500 mx-auto mb-1" />
            <div className="text-xs text-gray-600">{provider.projectsCompleted}+</div>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Main button now opens the website directly */}
          <Button 
            className="flex-1 bg-gradient-to-r from-purple-600 to-green-600 hover:opacity-90 text-white"
            onClick={() => window.open(provider.website, '_blank', 'noopener,noreferrer')}
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.open(provider.website, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}