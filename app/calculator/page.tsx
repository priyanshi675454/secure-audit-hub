// app/calculator/page.tsx
// UNIQUE FEATURE: Advanced Cost Calculator with Visual Charts

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingDown,
  Calculator,
  PieChart,
  Download,
  Share2,
} from "lucide-react";

export default function CalculatorPage() {
  const [linesOfCode, setLinesOfCode] = useState(5000);
  const [complexity, setComplexity] = useState("medium");
  const [timeline, setTimeline] = useState("standard");
  const [hasTests, setHasTests] = useState(true);
  const [projectType, setProjectType] = useState("DeFi");

  // Pricing logic
  const calculateBasePrice = () => {
    let basePrice = 40000;

    // Lines of code factor
    if (linesOfCode > 10000) basePrice += 20000;
    else if (linesOfCode > 5000) basePrice += 10000;

    // Complexity factor
    if (complexity === "high") basePrice += 15000;
    else if (complexity === "critical") basePrice += 30000;

    // Timeline factor
    if (timeline === "expedited") basePrice += 10000;
    else if (timeline === "emergency") basePrice += 25000;

    // Project type factor
    if (projectType === "DeFi") basePrice += 10000;
    else if (projectType === "Infrastructure") basePrice += 15000;

    // Test coverage discount
    if (!hasTests) basePrice += 5000;

    return basePrice;
  };

  const basePrice = calculateBasePrice();
  const subsidyAmount = Math.min(basePrice * 0.3, 50000);
  const yourCost = basePrice - subsidyAmount;
  const savingsPercent = ((subsidyAmount / basePrice) * 100).toFixed(1);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 text-lg px-6 py-2">
            <Calculator className="w-5 h-5 mr-2" />
            Smart Cost Calculator
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calculate Your Audit Costs
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Get instant estimates with subsidy applied
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-8 border-2">
            <h2 className="text-2xl font-bold mb-6">Project Details</h2>

            {/* Lines of Code */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">
                Lines of Code: {linesOfCode.toLocaleString()}
              </label>
              <Slider
                value={[linesOfCode]}
                onValueChange={(v) => setLinesOfCode(v[0])}
                min={1000}
                max={50000}
                step={500}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1K</span>
                <span>50K</span>
              </div>
            </div>

            {/* Project Type */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Project Type</label>
              <div className="grid grid-cols-2 gap-3">
                {["DeFi", "NFT", "Gaming", "Infrastructure", "DAO", "Other"].map((type) => (
                  <Button
                    key={type}
                    variant={projectType === type ? "default" : "outline"}
                    onClick={() => setProjectType(type)}
                    className={
                      projectType === type
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : ""
                    }
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Complexity Level</label>
              <div className="grid grid-cols-4 gap-2">
                {["low", "medium", "high", "critical"].map((level) => (
                  <Button
                    key={level}
                    variant={complexity === level ? "default" : "outline"}
                    onClick={() => setComplexity(level)}
                    className={
                      complexity === level
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 capitalize"
                        : "capitalize"
                    }
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Timeline Preference</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "standard", label: "Standard\n4-6 weeks" },
                  { value: "expedited", label: "Expedited\n2-3 weeks" },
                  { value: "emergency", label: "Emergency\n< 2 weeks" },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={timeline === option.value ? "default" : "outline"}
                    onClick={() => setTimeline(option.value)}
                    className={`h-auto py-3 whitespace-pre-line text-sm ${
                      timeline === option.value
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : ""
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Test Coverage */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTests}
                  onChange={(e) => setHasTests(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-semibold">
                  Project has comprehensive test coverage
                </span>
              </label>
              {!hasTests && (
                <p className="text-sm text-amber-600 mt-2">
                  ⚠️ Additional $5,000 for projects without test coverage
                </p>
              )}
            </div>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card className="p-8 border-2 bg-gradient-to-br from-blue-50 to-purple-50">
              <h2 className="text-2xl font-bold mb-6">Cost Breakdown</h2>

              <div className="space-y-4">
                {/* Total Audit Cost */}
                <div className="flex justify-between items-center pb-4 border-b-2">
                  <span className="text-lg font-semibold">Total Audit Cost</span>
                  <span className="text-2xl font-bold">${basePrice.toLocaleString()}</span>
                </div>

                {/* Subsidy */}
                <div className="flex justify-between items-center pb-4 border-b-2">
                  <div>
                    <span className="text-lg font-semibold text-green-700">
                      Subsidy (30%)
                    </span>
                    <p className="text-xs text-gray-600">Maximum: $50,000</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    -${subsidyAmount.toLocaleString()}
                  </span>
                </div>

                {/* Your Cost */}
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-lg">
                  <span className="text-xl font-bold">Your Final Cost</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${yourCost.toLocaleString()}
                  </span>
                </div>

                {/* Savings Badge */}
                <div className="text-center p-4 bg-green-100 rounded-lg">
                  <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-green-700">
                    You Save {savingsPercent}%
                  </p>
                  <p className="text-sm text-gray-600">
                    ${subsidyAmount.toLocaleString()} saved with subsidy
                  </p>
                </div>
              </div>
            </Card>

            {/* Visual Chart */}
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4">Cost Visualization</h3>
              <div className="relative h-32 bg-gray-200 rounded-lg overflow-hidden">
                {/* Subsidy portion */}
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold"
                  style={{ width: `${(subsidyAmount / basePrice) * 100}%` }}
                >
                  <span className="text-sm">
                    Subsidy: ${subsidyAmount.toLocaleString()}
                  </span>
                </div>
                {/* Your cost portion */}
                <div
                  className="absolute right-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold"
                  style={{ width: `${(yourCost / basePrice) * 100}%` }}
                >
                  <span className="text-sm">You Pay: ${yourCost.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Subsidy Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>Your Payment</span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 h-14">
                <Download className="w-5 h-5 mr-2" />
                Save Estimate
              </Button>
              <Button variant="outline" className="h-14">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 h-16 text-lg"
              onClick={() => (window.location.href = "/apply")}
            >
              Apply for Subsidy →
            </Button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center border-2 hover:border-blue-300 transition-all">
            <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Up to 30% Coverage</h3>
            <p className="text-gray-600 text-sm">
              Maximum subsidy of $50,000 per project
            </p>
          </Card>
          <Card className="p-6 text-center border-2 hover:border-purple-300 transition-all">
            <PieChart className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Instant Calculation</h3>
            <p className="text-gray-600 text-sm">
              Get accurate estimates in real-time
            </p>
          </Card>
          <Card className="p-6 text-center border-2 hover:border-green-300 transition-all">
            <Calculator className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Transparent Pricing</h3>
            <p className="text-gray-600 text-sm">
              No hidden fees or surprise costs
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}