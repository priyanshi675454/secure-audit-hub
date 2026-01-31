"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  BookOpen,
  FileText,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Lightbulb,
  Mail,
  Phone,
  User,
  Send,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "application", label: "Application Process", icon: FileText },
    { id: "subsidy", label: "Subsidy Program", icon: CheckCircle2 },
    { id: "providers", label: "Audit Providers", icon: BookOpen },
    { id: "technical", label: "Technical", icon: Lightbulb },
  ];

  const faqs = [
    {
      category: "application",
      question: "How do I apply for the Solana Audit Subsidy Program?",
      answer:
        "To apply, you need to submit applications through both the Subsidy Program Application Form and the Earn platform. Applications will be automatically matched between both platforms. Make sure to include your website or X profile link in the submission field for best results.",
    },
    {
      category: "application",
      question: "What documents do I need to prepare for my application?",
      answer:
        "You'll need: 1) Project overview and whitepaper, 2) Smart contract code (GitHub link), 3) Technical documentation, 4) Team information, 5) Project roadmap, 6) Budget breakdown. Having these ready will speed up your application process significantly.",
    },
    {
      category: "application",
      question: "How long does the application review take?",
      answer:
        "The expert panel typically reviews applications within 1-2 weeks. More complex projects or those requiring additional information may take slightly longer. You'll be notified via email about your application status.",
    },
    {
      category: "subsidy",
      question: "How much subsidy can I receive?",
      answer:
        "Projects can receive subsidies ranging from $5,000 to $50,000, covering up to 30% of your audit costs. The exact amount depends on your project's scope, complexity, and the assessment by the expert panel.",
    },
    {
      category: "subsidy",
      question: "What makes a project eligible for the subsidy?",
      answer:
        "Eligible projects must: 1) Build on the Solana ecosystem, 2) Have working code ready for audit, 3) Demonstrate real utility and potential impact, 4) Have a committed team, 5) Show clear roadmap for mainnet deployment. DeFi protocols, NFT platforms, gaming projects, and infrastructure tools are all eligible.",
    },
    {
      category: "subsidy",
      question: "Can I apply multiple times?",
      answer:
        "Yes, but each application should be for a distinct project or a significant new version with substantial changes. You cannot reapply for the same project within the same cohort, but you may apply in future cohorts if your first application was unsuccessful.",
    },
    {
      category: "subsidy",
      question: "When will I receive the subsidy funds?",
      answer:
        "Subsidies are applied directly when you select an audit provider offer on the marketplace. You'll receive a Subsidy Voucher Code that can be redeemed for up to 30% off the audit cost. The subsidy is automatically calculated and applied at checkout.",
    },
    {
      category: "providers",
      question: "How do I choose the right audit provider?",
      answer:
        "Consider these factors: 1) Provider's expertise in your project type (DeFi, NFT, etc.), 2) Pricing within your budget, 3) Turnaround time requirements, 4) Additional services offered (formal verification, bug bounty, insurance), 5) Past client reviews and completed projects. Use our comparison tool to evaluate providers side-by-side.",
    },
    {
      category: "providers",
      question: "Can I work with providers not on the approved list?",
      answer:
        "The subsidy can only be applied to audits from the 15 pre-vetted approved providers. However, you're free to work with any auditor for non-subsidized audits. The approved providers have been carefully selected for their quality, Solana expertise, and track record.",
    },
    {
      category: "providers",
      question: "What if multiple providers give me quotes?",
      answer:
        "You can receive quotes from multiple providers and choose the one that best fits your needs. The subsidy voucher can be applied to any approved provider's quote. We recommend getting at least 2-3 quotes to compare pricing and service offerings.",
    },
    {
      category: "technical",
      question: "Do I need to prepare my code in a specific way?",
      answer:
        "Yes, best practices include: 1) Clean, well-commented code, 2) Comprehensive documentation, 3) Complete test coverage, 4) Deployment scripts, 5) Clear README with setup instructions. The better prepared your code, the faster and more efficient the audit process.",
    },
    {
      category: "technical",
      question: "What programming languages are supported?",
      answer:
        "All approved auditors support Rust (Solana's primary language) and Anchor framework. Many also support TypeScript for frontend/SDK code. If you're using other languages or frameworks, check with individual providers about their capabilities.",
    },
    {
      category: "technical",
      question: "How long does an audit typically take?",
      answer:
        "Standard audits take 3-6 weeks depending on code complexity and provider availability. Expedited audits (2-3 weeks) are available at additional cost. Emergency audits (< 2 weeks) are possible but significantly more expensive. Plan your timeline accordingly.",
    },
    {
      category: "technical",
      question: "What happens after the audit is complete?",
      answer:
        "You'll receive a detailed audit report with findings categorized by severity (critical, high, medium, low). You'll need to address critical and high-severity issues before mainnet deployment. Many providers offer post-audit support to help you implement fixes and can perform a re-audit if needed.",
    },
    {
      category: "application",
      question: "What is the acceptance rate for applications?",
      answer:
        "Acceptance rates vary by cohort, but typically 40-60% of applications receive some level of subsidy. Strong applications with well-defined projects, experienced teams, and clear Solana ecosystem value have the highest success rates.",
    },
    {
      category: "subsidy",
      question: "Are there any restrictions on how I use the subsidy?",
      answer:
        "The subsidy must be used exclusively for security audits from approved providers within the program timeframe. It cannot be transferred, sold, or used for other purposes. Any unused portion of the subsidy does not carry over or get refunded.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`Support Request: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:secureaudithub@gmail.com?subject=${subject}&body=${body}`;

    // Show success message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowContactForm(false);
      }, 2000);
    }, 500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked
            </span>{" "}
            Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about the Solana Audit Subsidy Program
          </p>
        </motion.div>

        {/* Search */}
        <Card className="p-6 mb-8 border-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </Card>

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-600 to-purple-600"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ List */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-2">
              <h2 className="text-2xl font-bold mb-6">
                {filteredFaqs.length} Questions
              </h2>

              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border rounded-lg px-6 hover:border-purple-300 transition-colors"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-5">
                        <span className="font-semibold pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No questions found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter</p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Stats Card */}
              <Card className="p-6 border-2 bg-gradient-to-br from-purple-50 to-green-50">
                <h3 className="font-bold text-lg mb-4">Program Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Subsidies</span>
                    <span className="font-bold text-purple-600">$1M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Projects Helped</span>
                    <span className="font-bold text-purple-600">100+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Approved Auditors</span>
                    <span className="font-bold text-purple-600">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Subsidy</span>
                    <span className="font-bold text-purple-600">$20k</span>
                  </div>
                </div>
              </Card>

              {/* Contact Support Card */}
              <Card className="p-6 border-2">
                <MessageCircle className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">Still Have Questions?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our team is here to help you navigate the program
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold">Priyanshi Gajjar</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-purple-600" />
                    <a 
                      href="mailto:secureaudithub@gmail.com" 
                      className="text-purple-600 hover:underline"
                    >
                      secureaudithub@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-purple-600" />
                    <a 
                      href="tel:+918200272432" 
                      className="text-purple-600 hover:underline"
                    >
                      +91 8200272432
                    </a>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-600 to-purple-600 mb-2"
                  onClick={() => setShowContactForm(true)}
                >
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>

                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = "mailto:secureaudithub@gmail.com"}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Directly
                </Button>
              </Card>

              {/* Quick Links */}
              <Card className="p-6 border-2">
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href="https://solana.org/ecosystem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm">Program Guidelines</span>
                    <ExternalLink className="w-4 h-4 text-purple-600" />
                  </a>
                  <Link
                    href="/apply"
                    className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm">Application Form</span>
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </Link>
                  <Link
                    href="/providers"
                    className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm">Provider Marketplace</span>
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </Link>
                  <Link
                    href="/calculator"
                    className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm">Cost Calculator</span>
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </Link>
                  <Link
                    href="/resources"
                    className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm">Educational Resources</span>
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-16 p-12 bg-gradient-to-r from-orange-600 to-purple-600 text-white border-0">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl mb-8 text-white/90">
              Start your application today and secure up to $50k in audit subsidies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8">
                  Start Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/providers">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
                >
                  View Providers
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Contact Support</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-gray-600">
                    Your email client should open shortly. If not, please email us directly at secureaudithub@gmail.com
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Your Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Your Email</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Subject</label>
                    <Input
                      type="text"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Message</label>
                    <Textarea
                      placeholder="Please describe your question or issue..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Support Contact:</strong><br />
                      Priyanshi Gajjar<br />
                      📧 secureaudithub@gmail.com<br />
                      📞 +91 8200272432
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-purple-600 h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}