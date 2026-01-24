"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  Search,
  Code,
  Shield,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  Award,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Resources", icon: BookOpen },
    { id: "guides", label: "Guides", icon: FileText },
    { id: "videos", label: "Videos", icon: Video },
    { id: "templates", label: "Templates", icon: Download },
    { id: "security", label: "Security", icon: Shield },
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Audit Preparation Checklist",
      description: "Step-by-step checklist to prepare your Solana smart contracts for security audit. Covers code quality, documentation, testing, and more.",
      category: "guides",
      type: "Guide",
      duration: "15 min read",
      difficulty: "Beginner",
      icon: CheckCircle2,
      color: "text-green-600",
      downloadable: true,
      featured: true,
      link: "https://www.antiersolutions.com/blogs/solana-smart-contract-audits-key-benefits-process-breakdown/",
    },
    {
      id: 2,
      title: "Understanding Solana Security Vulnerabilities",
      description: "Deep dive into common security issues in Solana programs. Learn about reentrancy, account validation, and privilege escalation.",
      category: "security",
      type: "Article",
      duration: "25 min read",
      difficulty: "Advanced",
      icon: Shield,
      color: "text-red-600",
      downloadable: true,
      featured: true,
      link: "https://cantina.xyz/blog/securing-solana-a-developers-guide",
    },
    {
      id: 3,
      title: "How to Read an Audit Report",
      description: "Learn to interpret audit findings, understand severity levels, and prioritize fixes. Essential for all project teams.",
      category: "guides",
      type: "Tutorial",
      duration: "20 min read",
      difficulty: "Intermediate",
      icon: FileText,
      color: "text-blue-600",
      downloadable: true,
      featured: false,
      link: "https://www.auditone.io/blog-posts/how-to-read-a-smart-contract-audit-report",
    },
    {
      id: 4, 
       title: "Live Audit: Finding Solana Vulnerabilities",
       description: "Watch professional security researchers from Sec3 identify and fix real-world bugs in Solana programs during this technical workshop.",
       category: "videos",
       type: "Workshop",
        duration: "45 minutes", // Approximate duration for this workshop session
        difficulty: "Advanced",
        icon: Video,
        color: "text-purple-600",
        downloadable: false,
        featured: true,
        link: "https://www.youtube.com/watch?v=yYWqKRz82Pw&list=PLzUrW5H8-hDdU-pzHjZrgupi5Wis6zWNJ",
    },
    {
      id: 5,
      title: "Smart Contract Documentation Template",
      description: "Professional documentation template for Solana programs. Includes sections for architecture, security considerations, and deployment.",
      category: "templates",
      type: "Template",
      duration: "Instant download",
      difficulty: "All Levels",
      icon: Download,
      color: "text-orange-600",
      downloadable: true,
      featured: false,
      link: "https://github.com/solana-developers/program-examples/tree/main/basics/programs/token-2022",
    },
    {
      id: 6,
      title: "Post-Audit Implementation Guide",
      description: "Best practices for fixing audit findings, testing changes, and preparing for re-audit. Includes code examples.",
      category: "guides",
      type: "Guide",
      duration: "30 min read",
      difficulty: "Intermediate",
      icon: Code,
      color: "text-cyan-600",
      downloadable: true,
      featured: false,
      link: "https://www.chainsecurity.com/blog/how-to-read-smart-contract-audit-reports",
    },
    {
      id: 7,
      title: "Video Series: Security Best Practices",
      description: "5-part video series covering Solana security fundamentals, testing strategies, and common pitfalls to avoid.",
      category: "videos",
      type: "Video Series",
      duration: "2 hours total",
      difficulty: "Intermediate",
      icon: Video,
      color: "text-pink-600",
      downloadable: false,
      featured: true,
      link: "https://www.youtube.com/watch?v=fyn3nhKBNwM",
    },
    {
      id: 8,
      title: "Budget Planning Worksheet",
      description: "Excel template to plan your audit budget, compare provider quotes, and calculate subsidy savings.",
      category: "templates",
      type: "Template",
      duration: "Instant download",
      difficulty: "All Levels",
      icon: Download,
      color: "text-green-600",
      downloadable: true,
      featured: false,
      link: "https://www.smartsheet.com/content/contract-management-templates",
    },
    {
      id: 9,
      title: "Common Solana Program Vulnerabilities",
      description: "Comprehensive list of security issues specific to Solana, with code examples of vulnerable and secure implementations.",
      category: "security",
      type: "Reference",
      duration: "35 min read",
      difficulty: "Advanced",
      icon: AlertTriangle,
      color: "text-red-600",
      downloadable: true,
      featured: false,
      link: "https://cantina.xyz/blog/securing-solana-a-developers-guide",
    },
    {
      id: 10,
      title: "Audit Provider Selection Guide",
      description: "How to evaluate and choose the right security auditor for your project. Includes questions to ask and red flags to watch for.",
      category: "guides",
      type: "Guide",
      duration: "12 min read",
      difficulty: "Beginner",
      icon: Target,
      color: "text-indigo-600",
      downloadable: false,
      featured: false,
      link: "https://www.linkedin.com/pulse/ultimate-guide-smart-contract-audit-reports-how-protect-emekem-udom-tknuf",
    },
  ];

  const caseStudies = [
    {
      project: "DeFi Protocol X",
      result: "Secured $30k subsidy, completed audit in 3 weeks",
      savings: "$30,000",
      icon: TrendingUp,
    },
    {
      project: "NFT Marketplace Y",
      result: "Found 12 vulnerabilities, launched safely",
      savings: "$25,000",
      icon: Shield,
    },
    {
      project: "Gaming Platform Z",
      result: "Fast-tracked with expedited audit",
      savings: "$18,000",
      icon: Zap,
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = filteredResources.filter((r) => r.featured);
  const otherResources = filteredResources.filter((r) => !r.featured);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <BookOpen className="w-4 h-4 mr-2" />
            Knowledge Hub
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Educational
            </span>{" "}
            Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Guides, templates, and videos to help you navigate the audit process successfully
          </p>
        </motion.div>

        <Card className="p-6 mb-8 border-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      : ""
                  }
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {featuredResources.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} featured />
              ))}
            </div>
          </div>
        )}

        {otherResources.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">All Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherResources.map((resource, index) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  index={index + featuredResources.length}
                />
              ))}
            </div>
          </div>
        )}

        {filteredResources.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </Card>
        )}

        <div className="mt-16">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <Users className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Real Project Results</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how other Solana projects have benefited from the subsidy program
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-2 hover:border-green-300 transition-all text-center">
                  <study.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{study.project}</h3>
                  <p className="text-gray-600 mb-4">{study.result}</p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Subsidy Saved</div>
                    <div className="text-2xl font-bold text-green-600">{study.savings}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="mt-16 p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <div className="text-center max-w-3xl mx-auto">
            <Lightbulb className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Ready to Apply Your Knowledge?</h2>
            <p className="text-xl mb-8 text-white/90">
              Use these resources to prepare a winning application and secure your audit subsidy
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
                  Browse Providers
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// function ResourceCard({
//   resource,
//   index,
//   featured = false,
// }: {
//   resource: any;
//   index: number;
//   featured?: boolean;
// }) {
//   const handleAction = () => {
//     if (resource.category === "videos") {
//       // Open video link
//       window.open(resource.link || "https://www.youtube.com/results?search_query=solana+audit+tutorial", '_blank');
//     } else if (resource.downloadable) {
//       // Download file
//       const content = `
// ${resource.title}
// ${"=".repeat(resource.title.length)}

// ${resource.description}

// Type: ${resource.type}
// Duration: ${resource.duration}
// Difficulty: ${resource.difficulty}

// This is a sample resource file from SecureAuditHub.
// For the full content, visit: https://secureaudithub.com

// ---
// SecureAuditHub - Empowering Solana Projects
//       `.trim();

//       const blob = new Blob([content], { type: 'text/plain' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `${resource.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } else {
//       // View resource - show content
//       alert(`📖 ${resource.title}\n\n${resource.description}\n\n✨ This would open the full article in a new page. Feature coming soon!`);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.05 }}
//       className={featured ? "md:col-span-1" : ""}
//     >
//       <Card className="p-6 border-2 hover:border-blue-300 transition-all card-hover h-full flex flex-col">
//         <div className="flex items-start justify-between mb-4">
//           <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center`}>
//             <resource.icon className="w-6 h-6 text-white" />
//           </div>
//           {featured && (
//             <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Featured</Badge>
//           )}
//         </div>

//         <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
//         <p className="text-sm text-gray-600 mb-4 flex-grow">{resource.description}</p>

//         <div className="flex flex-wrap gap-2 mb-4">
//           <Badge variant="outline" className="text-xs">
//             {resource.type}
//           </Badge>
//           <Badge variant="outline" className="text-xs">
//             {resource.duration}
//           </Badge>
//           <Badge
//             variant="outline"
//             className={`text-xs ${
//               resource.difficulty === "Beginner"
//                 ? "border-green-300 text-green-700"
//                 : resource.difficulty === "Intermediate"
//                 ? "border-yellow-300 text-yellow-700"
//                 : "border-red-300 text-red-700"
//             }`}
//           >
//             {resource.difficulty}
//           </Badge>
//         </div>

//         <div className="flex gap-2">
//           <Button 
//             className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
//             onClick={handleAction}
//           >
//             {resource.downloadable ? (
//               <>
//                 <Download className="w-4 h-4 mr-2" />
//                 Download
//               </>
//             ) : resource.category === "videos" ? (
//               <>
//                 <Video className="w-4 h-4 mr-2" />
//                 Watch Video
//               </>
//             ) : (
//               <>
//                 View Resource
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </>
//             )}
//           </Button>
//           {resource.category === "videos" && (
//             <Button 
//               variant="outline" 
//               size="icon"
//               onClick={() => window.open(resource.link, '_blank')}
//             >
//               <ExternalLink className="w-4 h-4" />
//             </Button>
//           )}
//         </div>
//       </Card>
//     </motion.div>
//   );
// }
function ResourceCard({
  resource,
  index,
  featured = false,
}: {
  resource: any;
  index: number;
  featured?: boolean;
}) {
  const handleAction = () => {
    if (!resource.link) return;

    // 🎥 Videos
    if (resource.category === "videos") {
      window.open(resource.link, "_blank", "noopener,noreferrer");
      return;
    }

    // 📥 Real downloadable files only
    if (
      resource.downloadable &&
      /\.(pdf|docx?|xlsx?|zip)$/i.test(resource.link)
    ) {
      const a = document.createElement("a");
      a.href = resource.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // 🔗 Default: open article / website
    window.open(resource.link, "_blank", "noopener,noreferrer");
  };

  const getButtonLabel = () => {
    if (resource.category === "videos") return "Watch Video";
    if (
      resource.downloadable &&
      /\.(pdf|docx?|xlsx?|zip)$/i.test(resource.link)
    )
      return "Download";
    return "View Resource";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={featured ? "md:col-span-1" : ""}
    >
      <Card className="p-6 border-2 hover:border-blue-300 transition-all h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <resource.icon className="w-6 h-6 text-white" />
          </div>
          {featured && (
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
              Featured
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            {resource.type}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {resource.duration}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs ${
              resource.difficulty === "Beginner"
                ? "border-green-300 text-green-700"
                : resource.difficulty === "Intermediate"
                ? "border-yellow-300 text-yellow-700"
                : "border-red-300 text-red-700"
            }`}
          >
            {resource.difficulty}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            onClick={handleAction}
          >
            {resource.category === "videos" ? (
              <>
                <Video className="w-4 h-4 mr-2" />
                Watch Video
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                {getButtonLabel()}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              window.open(resource.link, "_blank", "noopener,noreferrer")
            }
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
