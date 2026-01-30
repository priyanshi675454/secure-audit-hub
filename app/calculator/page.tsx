

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
  Check,
} from "lucide-react";

export default function CalculatorPage() {
  const [linesOfCode, setLinesOfCode] = useState(5000);
  const [complexity, setComplexity] = useState("medium");
  const [timeline, setTimeline] = useState("standard");
  const [hasTests, setHasTests] = useState(true);
  const [projectType, setProjectType] = useState("DeFi");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Pricing logic
  const calculateBasePrice = () => {
    let basePrice = 40000;

    if (linesOfCode > 10000) basePrice += 20000;
    else if (linesOfCode > 5000) basePrice += 10000;

    if (complexity === "high") basePrice += 15000;
    else if (complexity === "critical") basePrice += 30000;

    if (timeline === "expedited") basePrice += 10000;
    else if (timeline === "emergency") basePrice += 25000;

    if (projectType === "DeFi") basePrice += 10000;
    else if (projectType === "Infrastructure") basePrice += 15000;

    if (!hasTests) basePrice += 5000;

    return basePrice;
  };

  const basePrice = calculateBasePrice();
  const subsidyAmount = Math.min(basePrice * 0.3, 50000);
  const yourCost = basePrice - subsidyAmount;
  const savingsPercent = ((subsidyAmount / basePrice) * 100).toFixed(1);

  // Save as PDF function
  const handleSavePDF = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    
    if (!printWindow) {
      alert('Failed to open print window. Please check your browser settings.');
      return;
    }
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Audit Cost Estimate - SecureAuditHub</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            padding: 40px;
            background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            text-align: center; 
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo { 
            font-size: 32px; 
            font-weight: 800; 
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
          }
          .subtitle { 
            color: #6b7280; 
            font-size: 16px; 
          }
          .section { 
            margin: 24px 0; 
            padding: 20px;
            background: #f9fafb;
            border-radius: 12px;
            border: 2px solid #e5e7eb;
          }
          .section-title { 
            font-size: 20px; 
            font-weight: 700; 
            color: #1f2937;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .detail-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .detail-row:last-child { border-bottom: none; }
          .label { 
            font-weight: 600; 
            color: #6b7280; 
          }
          .value { 
            font-weight: 700; 
            color: #111827; 
          }
          .cost-section {
            background: linear-gradient(135deg, #eff6ff, #dbeafe);
            border: 2px solid #3b82f6;
            padding: 24px;
            border-radius: 12px;
            margin: 24px 0;
          }
          .cost-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            font-size: 16px;
          }
          .cost-row.total {
            border-top: 3px solid #3b82f6;
            padding-top: 16px;
            margin-top: 8px;
          }
          .cost-value {
            font-weight: 700;
            font-size: 18px;
          }
          .cost-value.subsidy { color: #10b981; }
          .cost-value.final { 
            font-size: 32px; 
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .savings-badge {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            margin: 20px 0;
          }
          .savings-number {
            font-size: 40px;
            font-weight: 800;
            margin: 10px 0;
          }
          .chart {
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .chart-subsidy {
            background: linear-gradient(90deg, #10b981, #059669);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            width: ${(subsidyAmount / basePrice) * 100}%;
          }
          .chart-payment {
            background: linear-gradient(90deg, #9333ea, #7c3aed);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            width: ${(yourCost / basePrice) * 100}%;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .timestamp {
            color: #9ca3af;
            font-size: 12px;
            margin-top: 8px;
          }
          @media print {
            body { background: white; }
            .container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🛡️ SecureAuditHub</div>
            <div class="subtitle">Audit Cost Estimate Report</div>
          </div>

          <div class="section">
            <div class="section-title">📋 Project Details</div>
            <div class="detail-row">
              <span class="label">Project Type</span>
              <span class="value">${projectType}</span>
            </div>
            <div class="detail-row">
              <span class="label">Lines of Code</span>
              <span class="value">${linesOfCode.toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <span class="label">Complexity Level</span>
              <span class="value" style="text-transform: capitalize;">${complexity}</span>
            </div>
            <div class="detail-row">
              <span class="label">Timeline Preference</span>
              <span class="value" style="text-transform: capitalize;">${timeline.replace('-', ' ')}</span>
            </div>
            <div class="detail-row">
              <span class="label">Test Coverage</span>
              <span class="value">${hasTests ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div class="cost-section">
            <div class="section-title">💰 Cost Breakdown</div>
            
            <div class="cost-row">
              <span>Total Audit Cost</span>
              <span class="cost-value">$${basePrice.toLocaleString()}</span>
            </div>
            
            <div class="cost-row">
              <span>Subsidy Amount (30%)</span>
              <span class="cost-value subsidy">- $${subsidyAmount.toLocaleString()}</span>
            </div>
            
            <div class="cost-row total">
              <span style="font-size: 20px; font-weight: 700;">Your Final Cost</span>
              <span class="cost-value final">$${yourCost.toLocaleString()}</span>
            </div>
          </div>

          <div class="savings-badge">
            <div style="font-size: 18px;">🎉 You Could Save</div>
            <div class="savings-number">$${subsidyAmount.toLocaleString()}</div>
            <div>That's ${savingsPercent}% off your audit cost!</div>
          </div>

          <div class="section">
            <div class="section-title">📊 Cost Visualization</div>
            <div class="chart">
              <div class="chart-subsidy">
                Subsidy: $${subsidyAmount.toLocaleString()}
              </div>
              <div class="chart-payment">
                You Pay: $${yourCost.toLocaleString()}
              </div>
            </div>
          </div>

          <div class="footer">
            <p><strong>SecureAuditHub</strong></p>
            <p>https://secure-audit-hub.vercel.app</p>
            <p class="timestamp">Generated on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load then trigger print dialog
      setTimeout(() => {
        if (printWindow) {
          printWindow.print();
        }
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
      }, 500);
    }
  };

  // Share function
  const handleShare = async (platform: string) => {
    const shareText = `💰 My Solana Audit Cost Estimate from SecureAuditHub:

📊 Project: ${projectType} (${linesOfCode.toLocaleString()} LOC)
💵 Total Cost: $${basePrice.toLocaleString()}
🎉 Subsidy: $${subsidyAmount.toLocaleString()} (${savingsPercent}%)
✅ Final Cost: $${yourCost.toLocaleString()}

Calculate yours: https://secure-audit-hub.vercel.app/calculator`;

    const shareUrl = 'https://secure-audit-hub.vercel.app/calculator';

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=My Audit Cost Estimate&body=${encodeURIComponent(shareText)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText);
        alert('✅ Estimate copied to clipboard!');
        break;
      default:
        // Native share if available
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Audit Cost Estimate',
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
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Success Message */}
        {showSaveSuccess && (
          <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-in">
            <Check className="w-6 h-6" />
            <div>
              <p className="font-bold">✅ Estimate Saved!</p>
              <p className="text-sm">Your estimate is ready to download</p>
            </div>
          </div>
        )}

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
                <div className="flex justify-between items-center pb-4 border-b-2">
                  <span className="text-lg font-semibold">Total Audit Cost</span>
                  <span className="text-2xl font-bold">${basePrice.toLocaleString()}</span>
                </div>

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

                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-lg">
                  <span className="text-xl font-bold">Your Final Cost</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${yourCost.toLocaleString()}
                  </span>
                </div>

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
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold"
                  style={{ width: `${(subsidyAmount / basePrice) * 100}%` }}
                >
                  <span className="text-sm">
                    Subsidy: ${subsidyAmount.toLocaleString()}
                  </span>
                </div>
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
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-14"
                onClick={handleSavePDF}
              >
                <Download className="w-5 h-5 mr-2" />
                Save Estimate
              </Button>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="h-14 w-full"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
                
                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full mt-2 right-0 bg-white border-2 rounded-lg shadow-xl z-50 w-64 p-2">
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 rounded flex items-center gap-3"
                    >
                      <span className="text-2xl">💬</span>
                      <span className="font-medium">WhatsApp</span>
                    </button>
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
                      onClick={() => handleShare('telegram')}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded flex items-center gap-3"
                    >
                      <span className="text-2xl">✈️</span>
                      <span className="font-medium">Telegram</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded flex items-center gap-3"
                    >
                      <span className="text-2xl">📘</span>
                      <span className="font-medium">Facebook</span>
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

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}