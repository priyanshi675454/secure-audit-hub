"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Star,
  DollarSign,
  Clock,
  Shield,
  Award,
  Users,
  Zap,
  ArrowRight,
  Plus,
  X,
  ExternalLink,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

interface Provider {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  priceRange: string;
  avgDuration: string;
  projectsCompleted: number;
  specialties: string[];
  features: {
    formalVerification: boolean;
    bugBounty: boolean;
    insurance: boolean;
    continuousMonitoring: boolean;
    postAuditSupport: boolean;
    emergencyResponse: boolean;
  };
  strengths: string[];
  turnaroundTime: string;
  teamSize: string;
  website: string;
  contactEmail: string;
}

export default function ComparePage() {
  // ALL 15 OFFICIAL PROVIDERS from Solana Audit Subsidy Program
  const allProviders: Provider[] = [
    {
      id: 1,
      name: "Adevar Labs Inc.",
      logo: "AL",
      rating: 4.9,
      reviews: 45,
      priceRange: "$15k - $50k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 120,
      specialties: ["DeFi", "Smart Contracts", "Web3"],
      features: {
        formalVerification: true,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Fast turnaround", "Solana expertise", "Detailed reports"],
      turnaroundTime: "2-3 weeks",
      teamSize: "15-20 auditors",
      website: "https://www.adevarlabs.com",
      contactEmail: "contact@adevarlabs.com",
    },
    {
      id: 2,
      name: "Certora",
      logo: "CE",
      rating: 4.8,
      reviews: 38,
      priceRange: "$20k - $60k",
      avgDuration: "4-6 weeks",
      projectsCompleted: 95,
      specialties: ["Formal Verification", "DeFi", "Smart Contracts"],
      features: {
        formalVerification: true,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: false,
      },
      strengths: ["Mathematical proofs", "Formal verification", "Academic backing"],
      turnaroundTime: "4-5 weeks",
      teamSize: "20-25 auditors",
      website: "https://www.certora.com",
      contactEmail: "info@certora.com",
    },
    {
      id: 3,
      name: "ChainSecurity",
      logo: "CS",
      rating: 4.7,
      reviews: 42,
      priceRange: "$18k - $55k",
      avgDuration: "3-5 weeks",
      projectsCompleted: 110,
      specialties: ["Smart Contracts", "NFT", "Gaming"],
      features: {
        formalVerification: true,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["NFT expertise", "Gaming focus", "Comprehensive audits"],
      turnaroundTime: "3-5 weeks",
      teamSize: "18-22 auditors",
      website: "https://chainsecurity.com",
      contactEmail: "info@chainsecurity.com",
    },
    {
      id: 4,
      name: "Cyfrin",
      logo: "CY",
      rating: 4.9,
      reviews: 52,
      priceRange: "$12k - $45k",
      avgDuration: "2-4 weeks",
      projectsCompleted: 140,
      specialties: ["DeFi", "Infrastructure", "Protocols"],
      features: {
        formalVerification: false,
        bugBounty: true,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Competitive pricing", "Fast delivery", "Great support"],
      turnaroundTime: "2-3 weeks",
      teamSize: "25-30 auditors",
      website: "https://www.cyfrin.io",
      contactEmail: "contact@cyfrin.io",
    },
    {
      id: 5,
      name: "Guardian",
      logo: "GU",
      rating: 4.6,
      reviews: 35,
      priceRange: "$16k - $50k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 88,
      specialties: ["Web3", "Smart Contracts", "DeFi"],
      features: {
        formalVerification: false,
        bugBounty: false,
        insurance: true,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Flexible engagement", "Insurance option", "Solana focus"],
      turnaroundTime: "3-4 weeks",
      teamSize: "12-18 auditors",
      website: "https://guardianaudits.com",
      contactEmail: "contact@guardianaudits.com",
    },
    {
      id: 6,
      name: "Hacken",
      logo: "HA",
      rating: 4.7,
      reviews: 48,
      priceRange: "$14k - $48k",
      avgDuration: "3-5 weeks",
      projectsCompleted: 125,
      specialties: ["DeFi", "NFT", "Exchange"],
      features: {
        formalVerification: false,
        bugBounty: true,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Blockchain security", "Global team", "Fast response"],
      turnaroundTime: "3-5 weeks",
      teamSize: "30+ auditors",
      website: "https://hacken.io",
      contactEmail: "sales@hacken.io",
    },
    {
      id: 7,
      name: "Hexens",
      logo: "HE",
      rating: 4.8,
      reviews: 40,
      priceRange: "$17k - $52k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 102,
      specialties: ["Smart Contracts", "DeFi", "Infrastructure"],
      features: {
        formalVerification: true,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Boutique firm", "High complexity", "Detailed analysis"],
      turnaroundTime: "3-4 weeks",
      teamSize: "10-15 auditors",
      website: "https://hexens.io",
      contactEmail: "contact@hexens.io",
    },
    {
      id: 8,
      name: "Immunefi",
      logo: "IM",
      rating: 4.9,
      reviews: 55,
      priceRange: "$10k - $40k",
      avgDuration: "2-3 weeks",
      projectsCompleted: 160,
      specialties: ["Bug Bounty", "DeFi", "Security"],
      features: {
        formalVerification: false,
        bugBounty: true,
        insurance: true,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Bug bounty platform", "Continuous security", "Insurance"],
      turnaroundTime: "2-3 weeks",
      teamSize: "50+ auditors",
      website: "https://immunefi.com",
      contactEmail: "contact@immunefi.com",
    },
    {
      id: 9,
      name: "Oak Security",
      logo: "OA",
      rating: 4.8,
      reviews: 44,
      priceRange: "$15k - $50k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 115,
      specialties: ["Smart Contracts", "DeFi", "NFT"],
      features: {
        formalVerification: false,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Solana native", "Deep ecosystem knowledge", "NFT expertise"],
      turnaroundTime: "3-4 weeks",
      teamSize: "15-20 auditors",
      website: "https://www.oaksecurity.io",
      contactEmail: "hello@oaksecurity.io",
    },
    {
      id: 10,
      name: "Quantstamp",
      logo: "QU",
      rating: 4.7,
      reviews: 50,
      priceRange: "$18k - $60k",
      avgDuration: "4-6 weeks",
      projectsCompleted: 130,
      specialties: ["DeFi", "Smart Contracts", "Protocols"],
      features: {
        formalVerification: true,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Industry veteran", "Major protocols", "Comprehensive"],
      turnaroundTime: "4-6 weeks",
      teamSize: "25-30 auditors",
      website: "https://quantstamp.com",
      contactEmail: "info@quantstamp.com",
    },
    {
      id: 11,
      name: "QuillAudits",
      logo: "QA",
      rating: 4.6,
      reviews: 36,
      priceRange: "$12k - $42k",
      avgDuration: "2-4 weeks",
      projectsCompleted: 92,
      specialties: ["Smart Contracts", "DeFi", "Web3"],
      features: {
        formalVerification: false,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: false,
      },
      strengths: ["Cost-effective", "Quick turnaround", "Growing projects"],
      turnaroundTime: "2-4 weeks",
      teamSize: "15-20 auditors",
      website: "https://www.quillaudits.com",
      contactEmail: "audits@quillhash.com",
    },
    {
      id: 12,
      name: "Runtime Verification",
      logo: "RV",
      rating: 4.9,
      reviews: 41,
      priceRange: "$22k - $65k",
      avgDuration: "5-7 weeks",
      projectsCompleted: 78,
      specialties: ["Formal Verification", "Protocols", "Infrastructure"],
      features: {
        formalVerification: true,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Academic-grade", "Formal methods", "Highest standards"],
      turnaroundTime: "5-7 weeks",
      teamSize: "12-18 auditors",
      website: "https://runtimeverification.com",
      contactEmail: "contact@runtimeverification.com",
    },
    {
      id: 13,
      name: "Sherlock",
      logo: "SH",
      rating: 4.8,
      reviews: 46,
      priceRange: "$16k - $54k",
      avgDuration: "3-5 weeks",
      projectsCompleted: 108,
      specialties: ["DeFi", "Insurance", "Security"],
      features: {
        formalVerification: false,
        bugBounty: true,
        insurance: true,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Audit + insurance", "Comprehensive coverage", "Solana focus"],
      turnaroundTime: "3-5 weeks",
      teamSize: "20-25 auditors",
      website: "https://www.sherlock.xyz",
      contactEmail: "info@sherlock.xyz",
    },
    {
      id: 14,
      name: "Statemind",
      logo: "ST",
      rating: 4.7,
      reviews: 39,
      priceRange: "$15k - $48k",
      avgDuration: "3-4 weeks",
      projectsCompleted: 97,
      specialties: ["Smart Contracts", "DeFi", "Infrastructure"],
      features: {
        formalVerification: true,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Security-first", "Comprehensive testing", "Detailed reports"],
      turnaroundTime: "3-4 weeks",
      teamSize: "15-20 auditors",
      website: "https://statemind.io",
      contactEmail: "hello@statemind.io",
    },
    {
      id: 15,
      name: "Zellic",
      logo: "ZE",
      rating: 4.9,
      reviews: 58,
      priceRange: "$20k - $65k",
      avgDuration: "4-6 weeks",
      projectsCompleted: 145,
      specialties: ["Smart Contracts", "DeFi", "Infrastructure"],
      features: {
        formalVerification: true,
        bugBounty: false,
        insurance: false,
        continuousMonitoring: true,
        postAuditSupport: true,
        emergencyResponse: true,
      },
      strengths: ["Top-tier auditor", "Major protocols", "Premium service"],
      turnaroundTime: "4-6 weeks",
      teamSize: "30+ auditors",
      website: "https://www.zellic.io",
      contactEmail: "inquiries@zellic.io",
    },
  ];

  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([
    allProviders[0], // Adevar Labs
    allProviders[3], // Cyfrin
    allProviders[7], // Immunefi
  ]);

  const [showAddProvider, setShowAddProvider] = useState(false);

  const addProvider = (provider: Provider) => {
    if (selectedProviders.length < 4 && !selectedProviders.find(p => p.id === provider.id)) {
      setSelectedProviders([...selectedProviders, provider]);
      setShowAddProvider(false);
    }
  };

  const removeProvider = (id: number) => {
    if (selectedProviders.length > 2) {
      setSelectedProviders(selectedProviders.filter(p => p.id !== id));
    }
  };

  const availableProviders = allProviders.filter(
    p => !selectedProviders.find(sp => sp.id === p.id)
  );

  // Contact provider via email
  const handleContactProvider = (provider: Provider) => {
    const subject = encodeURIComponent(`Solana Audit Inquiry - Subsidy Program Cohort V`);
    const body = encodeURIComponent(
      `Hi ${provider.name} team,\n\n` +
      `I'm applying for the Solana Audit Subsidy Program (Cohort V) and interested in your audit services.\n\n` +
      `Project Details:\n` +
      `- Project Name: [Your Project]\n` +
      `- Project Type: [DeFi/NFT/Gaming/etc.]\n` +
      `- GitHub Repository: [Your Repo URL]\n` +
      `- Expected Launch: [Date]\n` +
      `- Lines of Code: [Approx.]\n\n` +
      `I have been approved for the subsidy program and can apply up to 30% coverage (max $50k) via Subsidy Voucher Code.\n\n` +
      `Could you please provide:\n` +
      `1. Quote for audit services\n` +
      `2. Estimated timeline\n` +
      `3. Availability for Q1/Q2 2026\n\n` +
      `Thank you!\n\n` +
      `Best regards`
    );
    
    window.location.href = `mailto:${provider.contactEmail}?subject=${subject}&body=${body}`;
  };

  // Visit provider website
  const handleVisitWebsite = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <Shield className="w-4 h-4 mr-2" />
            15 Approved Providers - Cohort V
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Compare Audit Providers
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            All 15 officially approved providers for the Solana Audit Subsidy Program. Compare features, pricing, and expertise side-by-side.
          </p>
          <p className="text-sm text-gray-500">
            Apply subsidy voucher code for up to 30% coverage (max $50k) when selecting quotes
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Header Row */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${selectedProviders.length}, 1fr)` }}>
              <div className="h-48"></div>
              {selectedProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border-2 border-purple-200 relative">
                    {selectedProviders.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeProvider(provider.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                      {provider.logo}
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2">{provider.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-gray-500 text-sm">({provider.reviews})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {provider.specialties.slice(0, 2).map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
              {selectedProviders.length < 4 && (
                <Card 
                  className="p-6 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
                  onClick={() => setShowAddProvider(!showAddProvider)}
                >
                  <div className="text-center">
                    <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Add Provider</p>
                  </div>
                </Card>
              )}
            </div>

            {/* Add Provider Modal */}
            {showAddProvider && (
              <Card className="p-4 mb-4 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">Select from 15 approved providers:</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddProvider(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {availableProviders.map((provider) => (
                    <Button
                      key={provider.id}
                      variant="outline"
                      onClick={() => addProvider(provider)}
                      className="hover:border-purple-400 text-xs"
                    >
                      {provider.name}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Price Range */}
            <ComparisonRow
              label="Price Range"
              icon={DollarSign}
              iconColor="text-green-500"
              values={selectedProviders.map(p => p.priceRange)}
            />

            {/* Avg Duration */}
            <ComparisonRow
              label="Avg Duration"
              icon={Clock}
              iconColor="text-blue-500"
              values={selectedProviders.map(p => p.avgDuration)}
            />

            {/* Projects Completed */}
            <ComparisonRow
              label="Projects Completed"
              icon={Award}
              iconColor="text-purple-500"
              values={selectedProviders.map(p => `${p.projectsCompleted}+`)}
            />

            {/* Turnaround Time */}
            <ComparisonRow
              label="Turnaround Time"
              icon={Zap}
              iconColor="text-yellow-500"
              values={selectedProviders.map(p => p.turnaroundTime)}
            />

            {/* Team Size */}
            <ComparisonRow
              label="Team Size"
              icon={Users}
              iconColor="text-pink-500"
              values={selectedProviders.map(p => p.teamSize)}
            />

            {/* Features Section */}
            <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: `200px repeat(${selectedProviders.length}, 1fr)` }}>
              <div className="flex items-center">
                <h3 className="font-bold text-lg">Features</h3>
              </div>
              {selectedProviders.map(() => <div key={Math.random()}></div>)}
            </div>

            <FeatureRow
              label="Formal Verification"
              values={selectedProviders.map(p => p.features.formalVerification)}
            />
            <FeatureRow
              label="Bug Bounty Platform"
              values={selectedProviders.map(p => p.features.bugBounty)}
            />
            <FeatureRow
              label="Audit Insurance"
              values={selectedProviders.map(p => p.features.insurance)}
            />
            <FeatureRow
              label="Continuous Monitoring"
              values={selectedProviders.map(p => p.features.continuousMonitoring)}
            />
            <FeatureRow
              label="Post-Audit Support"
              values={selectedProviders.map(p => p.features.postAuditSupport)}
            />
            <FeatureRow
              label="Emergency Response"
              values={selectedProviders.map(p => p.features.emergencyResponse)}
            />

            {/* Key Strengths Section */}
            <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: `200px repeat(${selectedProviders.length}, 1fr)` }}>
              <div className="flex items-center">
                <h3 className="font-bold text-lg">Key Strengths</h3>
              </div>
              {selectedProviders.map(() => <div key={Math.random()}></div>)}
            </div>

            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selectedProviders.length}, 1fr)` }}>
              <div className="py-4"></div>
              {selectedProviders.map((provider) => (
                <Card key={provider.id} className="p-4">
                  <ul className="space-y-2">
                    {provider.strengths.map((strength) => (
                      <li key={strength} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            {/* Contact CTA Row */}
            <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: `200px repeat(${selectedProviders.length}, 1fr)` }}>
              <div className="flex items-center">
                <h3 className="font-bold text-sm">Contact</h3>
              </div>
              {selectedProviders.map((provider) => (
                <div key={provider.id} className="space-y-2">
                  <Button
                    onClick={() => handleContactProvider(provider)}
                    className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:opacity-90"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email {provider.name.split(' ')[0]}
                  </Button>
                  <Button
                    onClick={() => handleVisitWebsite(provider.website)}
                    variant="outline"
                    className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation CTA */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-green-50 border-2">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Use our AI-powered recommendation engine to find the perfect audit provider for your Solana project
            </p>
            <Link href="/calculator">
              <Button className="bg-gradient-to-r from-purple-600 to-green-600 hover:opacity-90">
                Get Personalized Recommendation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Program Info */}
        <Card className="mt-8 p-6 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-blue-900 mb-2">About the Subsidy Program</h4>
              <p className="text-sm text-blue-800 mb-2">
                The Solana Audit Subsidy Program is a <span className="font-semibold">$1M initiative</span> by Superteam, MonkeDAO, Jito, and Areta Market to lower audit barriers for Solana projects.
              </p>
              <p className="text-sm text-blue-800">
                Apply your Subsidy Voucher Code when selecting quotes for <span className="font-semibold">up to 30% coverage</span> (maximum $50,000 per project).
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Comparison Row Component
function ComparisonRow({
  label,
  icon: Icon,
  iconColor,
  values,
}: {
  label: string;
  icon: any;
  iconColor: string;
  values: string[];
}) {
  return (
    <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${values.length}, 1fr)` }}>
      <div className="flex items-center gap-2 py-4">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span className="font-semibold text-sm">{label}</span>
      </div>
      {values.map((value, index) => (
        <Card key={index} className="p-4 flex items-center justify-center">
          <span className="font-medium text-center">{value}</span>
        </Card>
      ))}
    </div>
  );
}

// Feature Row Component
function FeatureRow({ label, values }: { label: string; values: boolean[] }) {
  return (
    <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${values.length}, 1fr)` }}>
      <div className="flex items-center py-4">
        <span className="text-sm font-medium">{label}</span>
      </div>
      {values.map((value, index) => (
        <Card key={index} className="p-4 flex items-center justify-center">
          {value ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-gray-300" />
          )}
        </Card>
      ))}
    </div>
);
}