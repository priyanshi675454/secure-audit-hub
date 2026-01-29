// app/compare/page.tsx
// UNIQUE FEATURE: Interactive Audit Provider Comparison Tool

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  CheckCircle2,
  XCircle,
  Star,
  DollarSign,
  Clock,
  Shield,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react";

interface AuditProvider {
  name: string;
  rating: number;
  specialization: string[];
  basePrice: number;
  timeline: string;
  linesOfCode: number;
  certifications: string[];
  pastProjects: number;
  features: string[];
  website: string;
}

export default function ComparePage() {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [projectSize, setProjectSize] = useState(5000);
  const [subsidyAmount, setSubsidyAmount] = useState(25000);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("All");

  const providers: AuditProvider[] = [
    {
      name: "Zellic",
      rating: 4.9,
      specialization: ["DeFi", "Smart Contracts", "Infrastructure"],
      basePrice: 80000,
      timeline: "4-6 weeks",
      linesOfCode: 10000,
      certifications: ["SOC 2", "ISO 27001"],
      pastProjects: 150,
      features: ["Real-time monitoring", "Continuous audits", "24/7 support"],
      website: "https://zellic.io",
    },
    {
      name: "OtterSec",
      rating: 4.8,
      specialization: ["Solana", "Rust", "Move"],
      basePrice: 75000,
      timeline: "3-5 weeks",
      linesOfCode: 8000,
      certifications: ["SOC 2"],
      pastProjects: 120,
      features: ["Solana expertise", "Fast turnaround", "Remediation support"],
      website: "https://osec.io",
    },
    {
      name: "Certora",
      rating: 4.7,
      specialization: ["Formal Verification", "DeFi", "Smart Contracts"],
      basePrice: 90000,
      timeline: "5-8 weeks",
      linesOfCode: 15000,
      certifications: ["SOC 2", "ISO 27001", "FedRAMP"],
      pastProjects: 200,
      features: ["Formal verification", "Mathematical proofs", "Deep analysis"],
      website: "https://certora.com",
    },
    {
      name: "Hacken",
      rating: 4.6,
      specialization: ["DeFi", "NFT", "Gaming"],
      basePrice: 60000,
      timeline: "3-4 weeks",
      linesOfCode: 7000,
      certifications: ["ISO 27001"],
      pastProjects: 180,
      features: ["Fast delivery", "Competitive pricing", "Bug bounty"],
      website: "https://hacken.io",
    },
    {
      name: "Oak Security",
      rating: 4.8,
      specialization: ["Solana", "CosmWasm", "Infrastructure"],
      basePrice: 70000,
      timeline: "4-5 weeks",
      linesOfCode: 9000,
      certifications: ["SOC 2"],
      pastProjects: 90,
      features: ["Solana native", "Expert team", "Comprehensive reports"],
      website: "https://oaksecurity.io",
    },
    {
      name: "Quantstamp",
      rating: 4.7,
      specialization: ["DeFi", "Layer 1", "Smart Contracts"],
      basePrice: 85000,
      timeline: "5-7 weeks",
      linesOfCode: 12000,
      certifications: ["SOC 2", "ISO 27001"],
      pastProjects: 250,
      features: ["Established reputation", "Deep expertise", "Insurance options"],
      website: "https://quantstamp.com",
    },
    {
      name: "ChainSecurity",
      rating: 4.8,
      specialization: ["DeFi", "Smart Contracts", "Bridges"],
      basePrice: 95000,
      timeline: "6-8 weeks",
      linesOfCode: 15000,
      certifications: ["SOC 2", "ISO 27001"],
      pastProjects: 160,
      features: ["Academic rigor", "Detailed reports", "Top-tier quality"],
      website: "https://chainsecurity.com",
    },
    {
      name: "Cyfrin",
      rating: 4.6,
      specialization: ["Education", "Smart Contracts", "DeFi"],
      basePrice: 55000,
      timeline: "3-4 weeks",
      linesOfCode: 6000,
      certifications: ["SOC 2"],
      pastProjects: 75,
      features: ["Educational approach", "Competitive pricing", "Quick turnaround"],
      website: "https://cyfrin.io",
    },
  ];

  const calculatePrice = (basePrice: number, projectSize: number) => {
    const factor = projectSize / 5000;
    return Math.round(basePrice * factor);
  };

  const calculateSubsidy = (price: number) => {
    const subsidyPercent = 0.3;
    const maxSubsidy = 50000;
    return Math.min(price * subsidyPercent, maxSubsidy, subsidyAmount);
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      filterSpecialization === "All" ||
      provider.specialization.includes(filterSpecialization);
    return matchesSearch && matchesSpecialization;
  });

  const toggleProvider = (name: string) => {
    if (selectedProviders.includes(name)) {
      setSelectedProviders(selectedProviders.filter((p) => p !== name));
    } else if (selectedProviders.length < 3) {
      setSelectedProviders([...selectedProviders, name]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200 text-lg px-6 py-2">
            <Filter className="w-5 h-5 mr-2" />
            Smart Comparison Tool
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
              Compare Audit Providers
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect audit provider for your project. Compare pricing, timelines, and
            expertise.
          </p>
        </div>

        {/* Calculator Section */}
        <Card className="p-8 mb-8 border-2 bg-gradient-to-r from-purple-50 to-green-50">
          <h2 className="text-2xl font-bold mb-6">📊 Project Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-semibold mb-3">
                Your Project Size (Lines of Code)
              </label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[projectSize]}
                  onValueChange={(value) => setProjectSize(value[0])}
                  min={1000}
                  max={50000}
                  step={1000}
                  className="flex-1"
                />
                <Badge className="bg-purple-600 text-white px-4 py-2 text-lg min-w-[120px]">
                  {projectSize.toLocaleString()}
                </Badge>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-3">
                Your Approved Subsidy Amount
              </label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[subsidyAmount]}
                  onValueChange={(value) => setSubsidyAmount(value[0])}
                  min={5000}
                  max={50000}
                  step={5000}
                  className="flex-1"
                />
                <Badge className="bg-green-600 text-white px-4 py-2 text-lg min-w-[120px]">
                  ${subsidyAmount.toLocaleString()}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Search Provider</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2">Filter by Specialization</label>
              <select
                value={filterSpecialization}
                onChange={(e) => setFilterSpecialization(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option>All</option>
                <option>DeFi</option>
                <option>Solana</option>
                <option>Smart Contracts</option>
                <option>NFT</option>
                <option>Gaming</option>
                <option>Infrastructure</option>
              </select>
            </div>
          </div>
          {selectedProviders.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected for comparison ({selectedProviders.length}/3):
              </p>
              <div className="flex gap-2">
                {selectedProviders.map((name) => (
                  <Badge key={name} className="bg-purple-600 text-white px-3 py-1">
                    {name}
                    <button
                      onClick={() => toggleProvider(name)}
                      className="ml-2 hover:text-red-300"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProviders.map((provider) => {
            const estimatedPrice = calculatePrice(provider.basePrice, projectSize);
            const subsidy = calculateSubsidy(estimatedPrice);
            const finalPrice = estimatedPrice - subsidy;
            const isSelected = selectedProviders.includes(provider.name);

            return (
              <Card
                key={provider.name}
                className={`p-6 hover:shadow-xl transition-all cursor-pointer ${
                  isSelected ? "border-4 border-purple-600" : "border-2"
                }`}
                onClick={() => toggleProvider(provider.name)}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{provider.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({provider.pastProjects} projects)
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {provider.timeline}
                  </Badge>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-1">
                    {provider.specialization.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Estimated Cost</span>
                    <span className="font-semibold">${estimatedPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Subsidy (30%)</span>
                    <span className="font-semibold text-green-600">
                      -${subsidy.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-bold">Your Cost</span>
                    <span className="font-bold text-2xl text-purple-600">
                      ${finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Key Features</p>
                  <ul className="space-y-1">
                    {provider.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-sm flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  className={`w-full ${
                    isSelected
                      ? "bg-purple-600"
                      : "bg-gradient-to-r from-purple-600 to-green-600"
                  }`}
                >
                  {isSelected ? "✓ Selected" : "Compare"}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        {selectedProviders.length > 1 && (
          <Card className="p-8 border-2">
            <h2 className="text-2xl font-bold mb-6">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-3 font-semibold">Feature</th>
                    {selectedProviders.map((name) => (
                      <th key={name} className="p-3 font-semibold text-center">
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Rating</td>
                    {selectedProviders.map((name) => {
                      const provider = providers.find((p) => p.name === name)!;
                      return (
                        <td key={name} className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {provider.rating}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Timeline</td>
                    {selectedProviders.map((name) => {
                      const provider = providers.find((p) => p.name === name)!;
                      return (
                        <td key={name} className="p-3 text-center">
                          {provider.timeline}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="p-3 font-medium">Your Final Cost</td>
                    {selectedProviders.map((name) => {
                      const provider = providers.find((p) => p.name === name)!;
                      const price = calculatePrice(provider.basePrice, projectSize);
                      const subsidy = calculateSubsidy(price);
                      return (
                        <td key={name} className="p-3 text-center">
                          <span className="text-xl font-bold text-purple-600">
                            ${(price - subsidy).toLocaleString()}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Past Projects</td>
                    {selectedProviders.map((name) => {
                      const provider = providers.find((p) => p.name === name)!;
                      return (
                        <td key={name} className="p-3 text-center">
                          {provider.pastProjects}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}