"use client";

import { useState } from "react";
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
  languages: string[];
}

export default function ComparePage() {
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
      languages: ["Rust", "TypeScript"],
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
      strengths: ["Mathematical proofs", "High security", "Academic backing"],
      turnaroundTime: "4-5 weeks",
      teamSize: "20-25 auditors",
      languages: ["Rust", "Solidity"],
    },
    {
      id: 3,
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
      languages: ["Rust", "TypeScript", "Move"],
    },
    {
      id: 4,
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
      languages: ["Rust", "Solidity", "TypeScript"],
    },
    {
      id: 5,
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
      strengths: ["Solana native", "Deep ecosystem knowledge", "NFT focus"],
      turnaroundTime: "3-4 weeks",
      teamSize: "15-20 auditors",
      languages: ["Rust", "Anchor"],
    },
  ];

  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([
    allProviders[0],
    allProviders[2],
    allProviders[3],
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
            Side-by-Side Comparison
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Compare Providers
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make an informed decision. Compare features, pricing, and expertise side by side.
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
                <Card className="p-6 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
                  onClick={() => setShowAddProvider(!showAddProvider)}>
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
                <h3 className="font-bold mb-3">Select a provider to add:</h3>
                <div className="flex gap-2 flex-wrap">
                  {availableProviders.map((provider) => (
                    <Button
                      key={provider.id}
                      variant="outline"
                      onClick={() => addProvider(provider)}
                      className="hover:border-purple-400"
                    >
                      {provider.name}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Pricing */}
            <ComparisonRow
              label="Price Range"
              icon={DollarSign}
              iconColor="text-green-500"
              values={selectedProviders.map(p => p.priceRange)}
            />

            {/* Duration */}
            <ComparisonRow
              label="Avg Duration"
              icon={Clock}
              iconColor="text-blue-500"
              values={selectedProviders.map(p => p.avgDuration)}
            />

            {/* Projects */}
            <ComparisonRow
              label="Projects Completed"
              icon={Award}
              iconColor="text-purple-500"
              values={selectedProviders.map(p => `${p.projectsCompleted}+`)}
            />

            {/* Turnaround */}
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

            {/* Section: Features */}
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

            {/* Section: Strengths */}
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

            {/* CTA Row */}
            <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: `200px repeat(${selectedProviders.length}, 1fr)` }}>
              <div></div>
              {selectedProviders.map((provider) => (
                <Button
                  key={provider.id}
                  className="bg-gradient-to-r from-purple-600 to-green-600 hover:opacity-90"
                >
                  Contact {provider.name.split(' ')[0]}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-green-50 border-2">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Use our AI-powered recommendation engine to find the perfect audit provider for your project
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-green-600">
              Get Personalized Recommendation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

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