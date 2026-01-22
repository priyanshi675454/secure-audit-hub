"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  FileText,
  Search,
  DollarSign,
  Shield,
  Award,
  ArrowRight,
  AlertCircle,
  Lightbulb,
  Users,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksPage() {
  const timeline = [
    {
      step: 1,
      title: "Prepare Your Project",
      duration: "1-2 weeks before",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      tasks: [
        "Clean and document your code",
        "Complete test coverage",
        "Prepare technical documentation",
        "Gather team information",
        "Define project scope and goals",
      ],
      tips: [
        "Start early - preparation takes longer than expected",
        "Well-documented code leads to better audit quality",
        "Have clear deployment timeline ready",
      ],
    },
    {
      step: 2,
      title: "Submit Application",
      duration: "Day 1",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      tasks: [
        "Fill out Subsidy Program Application Form",
        "Submit through Earn platform",
        "Provide project links and documentation",
        "Include team credentials",
        "Specify requested subsidy amount",
      ],
      tips: [
        "Be thorough - incomplete applications are rejected",
        "Highlight your project's unique value to Solana",
        "Use our application wizard for guidance",
      ],
    },
    {
      step: 3,
      title: "Expert Review",
      duration: "1-2 weeks",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      tasks: [
        "Panel reviews application against rubric",
        "Technical assessment of code quality",
        "Team and project viability check",
        "Budget and timeline evaluation",
        "Subsidy amount determination",
      ],
      tips: [
        "Check email regularly for update requests",
        "Be responsive to panel questions",
        "Maintain communication throughout review",
      ],
    },
    {
      step: 4,
      title: "Receive Approval",
      duration: "Day 15-20",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      tasks: [
        "Notification of approval and subsidy amount",
        "Receive Subsidy Voucher Code",
        "Onboarding to marketplace",
        "Access to all 15 approved providers",
        "Dashboard activation",
      ],
      tips: [
        "Save your voucher code securely",
        "Review all provider options carefully",
        "Start provider research immediately",
      ],
    },
    {
      step: 5,
      title: "Compare Providers",
      duration: "3-5 days",
      icon: Search,
      color: "from-indigo-500 to-blue-500",
      tasks: [
        "Review all 15 approved providers",
        "Request quotes from 2-3 providers",
        "Compare pricing, timeline, and services",
        "Check provider specializations",
        "Read reviews and past work",
      ],
      tips: [
        "Use our comparison tool for side-by-side analysis",
        "Consider both price and expertise",
        "Ask providers specific questions about your project",
      ],
    },
    {
      step: 6,
      title: "Select Provider & Apply Subsidy",
      duration: "Day 25-30",
      icon: DollarSign,
      color: "from-green-500 to-teal-500",
      tasks: [
        "Choose your preferred provider",
        "Review final quote and timeline",
        "Apply Subsidy Voucher Code at checkout",
        "Automatic 30% discount applied",
        "Sign audit agreement",
      ],
      tips: [
        "Subsidy covers up to 30% of costs",
        "Maximum subsidy is $50k",
        "Voucher must be used within program timeframe",
      ],
    },
    {
      step: 7,
      title: "Audit Process",
      duration: "2-6 weeks",
      icon: Shield,
      color: "from-purple-500 to-indigo-500",
      tasks: [
        "Kick-off call with audit team",
        "Code review and analysis",
        "Vulnerability assessment",
        "Regular progress updates",
        "Preliminary findings discussion",
      ],
      tips: [
        "Stay available for auditor questions",
        "Provide requested information promptly",
        "Review preliminary findings carefully",
      ],
    },
    {
      step: 8,
      title: "Receive Audit Report",
      duration: "Final week",
      icon: FileText,
      color: "from-red-500 to-pink-500",
      tasks: [
        "Detailed report with all findings",
        "Issues categorized by severity",
        "Recommendations for fixes",
        "Risk assessment and mitigation",
        "Best practices guidance",
      ],
      tips: [
        "Address critical issues immediately",
        "Plan time for implementing fixes",
        "Consider post-audit support if needed",
      ],
    },
    {
      step: 9,
      title: "Implement Fixes",
      duration: "1-2 weeks",
      icon: Zap,
      color: "from-yellow-500 to-red-500",
      tasks: [
        "Fix critical and high-severity issues",
        "Address medium-priority items",
        "Update documentation",
        "Re-test all changes",
        "Prepare for re-audit if needed",
      ],
      tips: [
        "Prioritize fixes by severity",
        "Document all changes made",
        "Some providers offer fix verification",
      ],
    },
    {
      step: 10,
      title: "Launch Securely",
      duration: "Launch day",
      icon: TrendingUp,
      color: "from-green-500 to-blue-500",
      tasks: [
        "Final security checklist",
        "Mainnet deployment",
        "Publish audit report",
        "Monitor for issues",
        "Celebrate your secure launch!",
      ],
      tips: [
        "Have monitoring in place from day 1",
        "Consider bug bounty program",
        "Keep in touch with auditor for ongoing support",
      ],
    },
  ];

  const programBenefits = [
    {
      icon: DollarSign,
      title: "Save Up to $50k",
      description: "30% subsidy on audit costs, maximum $50k coverage",
      color: "text-green-600",
    },
    {
      icon: Shield,
      title: "Pre-Vetted Providers",
      description: "15 top-tier auditors with proven Solana expertise",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Fast Process",
      description: "Application to launch in 6-10 weeks total",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Guidance from Solana ecosystem leaders",
      color: "text-pink-600",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Incomplete Documentation",
      solution: "Prepare all docs before applying",
      icon: AlertCircle,
    },
    {
      mistake: "Rushed Code Preparation",
      solution: "Start cleaning code 2 weeks early",
      icon: AlertCircle,
    },
    {
      mistake: "Not Comparing Providers",
      solution: "Get quotes from at least 3 auditors",
      icon: AlertCircle,
    },
    {
      mistake: "Ignoring Minor Issues",
      solution: "Address all findings, not just critical",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200">
            <Clock className="w-4 h-4 mr-2" />
            Complete Process
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              How It
            </span>{" "}
            Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your step-by-step guide from application to secure mainnet launch
          </p>
        </motion.div>

        {/* Program Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {programBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center border-2 hover:border-purple-300 transition-all">
                <benefit.icon className={`w-12 h-12 ${benefit.color} mx-auto mb-3`} />
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500" />

          {/* Timeline Steps */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-start gap-6">
                  {/* Step Number Circle */}
                  <div className="hidden md:block relative z-10">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-xl`}>
                      <div className="text-center">
                        <div className="text-sm font-semibold">STEP</div>
                        <div className="text-3xl font-bold">{item.step}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <Card className="p-8 border-2 hover:border-purple-300 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`md:hidden w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
                            <item.icon className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                            <Badge variant="outline" className="text-sm">
                              <Clock className="w-3 h-3 mr-1" />
                              {item.duration}
                            </Badge>
                          </div>
                        </div>
                        <item.icon className="hidden md:block w-8 h-8 text-purple-600" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Tasks */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            Key Tasks
                          </h4>
                          <ul className="space-y-2">
                            {item.tasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tips */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-yellow-600" />
                            Pro Tips
                          </h4>
                          <ul className="space-y-2">
                            {item.tips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                                <span className="text-sm text-gray-700 italic">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">
              <AlertCircle className="w-4 h-4 mr-2" />
              Avoid These Mistakes
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Common Pitfalls</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn from others and avoid these common mistakes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {commonMistakes.map((item, index) => (
              <Card key={index} className="p-6 border-2 border-red-100">
                <div className="flex gap-4">
                  <item.icon className="w-8 h-8 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-1">❌ {item.mistake}</h3>
                    <p className="text-sm text-green-700">✅ {item.solution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-16 p-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-white/90">
              Follow this proven process to secure your Solana project with confidence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8">
                  Start Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
                >
                  Use Cost Calculator
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}