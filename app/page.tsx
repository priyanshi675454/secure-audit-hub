"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Search,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Zap,
  Target,
  BookOpen,
  Sparkles,
  Clock,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: Search,
      title: "Provider Directory",
      description: "Compare all 15 approved audit firms side-by-side with detailed specs, pricing, and specializations",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Calculator,
      title: "Cost Calculator",
      description: "Get instant estimates with our smart calculator. See potential savings with subsidy applied",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your project type, size, and specific security needs",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BookOpen,
      title: "Learning Hub",
      description: "Comprehensive guides, tutorials, and best practices from security audit experts",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: CheckCircle2,
      title: "Application Wizard",
      description: "Step-by-step guidance with real-time feedback to maximize your approval chances",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "AI Assistant",
      description: "24/7 intelligent chatbot trained on audit knowledge to answer your questions instantly",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const stats = [
    { icon: DollarSign, value: "$1M+", label: "Total Subsidies", color: "text-green-500" },
    { icon: Shield, value: "15", label: "Audit Providers", color: "text-purple-500" },
    { icon: TrendingUp, value: "30%", label: "Subsidy Coverage", color: "text-blue-500" },
    { icon: Users, value: "100+", label: "Projects Helped", color: "text-pink-500" },
  ];

  const steps = [
  {
    number: "01",
    title: "Application",
    description: "Projects apply via both the Subsidy Program Application Form and the Earn platform. Applications auto-match.",
    icon: Target,
  },
  {
    number: "02",
    title: "Assessment",
    description: "Expert panel (Superteam, MonkeDAO, Jito, Areta) evaluates applications against standardized rubric.",
    icon: Users,
  },
  {
    number: "03",
    title: "Approval & Subsidy",
    description: "Qualified projects receive a subsidy amount and are onboarded to the marketplace.",
    icon: Award,
  },
  {
    number: "04",
    title: "Marketplace",
    description: "Projects receive offers from participating audit providers.",
    icon: Search,
  },
  {
    number: "05",
    title: "Quote Selection",
    description: "When selecting quotes, apply your subsidy to any offer with up to 30% coverage of costs.",
    icon: DollarSign,
  },
  {
    number: "06",
    title: "Voucher Redemption",
    description: "Projects apply their Subsidy Voucher Code when selecting an offer.",
    icon: CheckCircle2,
  },
];

  const testimonials = [
    {
      quote: "SecureAuditHub saved us weeks of research. The comparison tool is invaluable!",
      author: "Alex Chen",
      role: "Founder, DeFi Protocol",
      rating: 5,
    },
    {
      quote: "The application wizard helped us secure $25k in subsidies. Highly recommended!",
      author: "Sarah Williams",
      role: "CTO, NFT Marketplace",
      rating: 5,
    },
    {
      quote: "Best resource for navigating Solana audits. The AI assistant is incredibly helpful.",
      author: "Michael Rodriguez",
      role: "Lead Developer, Gaming DAO",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-green-50" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-green-500 text-white border-none px-6 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              Solana Audit Subsidy Program - Cohort V
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Your Complete Guide to
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Solana Audit Subsidies
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate the $1M Audit Subsidy Program with confidence. Compare providers,
              calculate costs, and prepare winning applications—all in one platform.
            </p>
            
            {/* PARTNERSHIP INFO - NEW */}
            <p className="text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
              A joint initiative by <span className="font-semibold text-purple-600">Superteam</span>, <span className="font-semibold text-purple-600">MonkeDAO</span>, <span className="font-semibold text-purple-600">Jito</span>, and <span className="font-semibold text-purple-600">Areta Market</span>
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                >
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  Compare Providers
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Card className="p-6 border-2 hover:border-purple-300 transition-all hover:shadow-lg">
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 mt-2 text-sm">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed to maximize your chances of approval
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-2 hover:border-purple-300 transition-all duration-300 group card-hover h-full">
                  <div className="mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <Clock className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Six essential steps to secure your audit subsidy
            </p>
          </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-2 hover:border-green-300 transition-all h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-purple-600 ml-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-purple-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              <Users className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Builders
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-2 hover:border-blue-300 transition-all h-full">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600" />
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="relative z-10 p-12 text-center text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join 100+ Solana projects that have successfully secured audit subsidies
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
                  >
                    Begin Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/providers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                  >
                    View All Providers
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              SecureAuditHub
            </span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering Solana projects with comprehensive audit guidance
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-purple-400 transition-colors">About</Link>
            <Link href="/providers" className="hover:text-purple-400 transition-colors">Providers</Link>
            <Link href="/resources" className="hover:text-purple-400 transition-colors">Resources</Link>
            <Link href="/faq" className="hover:text-purple-400 transition-colors">FAQ</Link>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            © 2026  Built for the SecureAuditHub. 
          </div>
        </div>
      </footer>
    </div>
  );
}