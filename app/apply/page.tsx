"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  Users,
  Code,
  DollarSign,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    websiteUrl: "",
    githubUrl: "",
    twitterUrl: "",
    description: "",
    teamSize: "",
    teamLead: "",
    teamEmail: "",
    teamExperience: "",
    linesOfCode: "",
    complexity: "",
    testCoverage: "",
    mainnetDate: "",
    requestedSubsidy: "",
    auditBudget: "",
    preferredTimeline: "",
  });

  const totalSteps = 5;

  const steps = [
    { number: 1, title: "Project Info", icon: FileText },
    { number: 2, title: "Team Details", icon: Users },
    { number: 3, title: "Technical", icon: Code },
    { number: 4, title: "Budget", icon: DollarSign },
    { number: 5, title: "Review", icon: CheckCircle2 },
  ];

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors.includes(field)) {
      setErrors(errors.filter(e => e !== field));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: string[] = [];

    if (step === 1) {
      if (!formData.projectName) newErrors.push("projectName");
      if (!formData.projectType) newErrors.push("projectType");
      if (!formData.githubUrl) newErrors.push("githubUrl");
    } else if (step === 2) {
      if (!formData.teamSize) newErrors.push("teamSize");
      if (!formData.teamLead) newErrors.push("teamLead");
      if (!formData.teamEmail) newErrors.push("teamEmail");
    } else if (step === 3) {
      if (!formData.mainnetDate) newErrors.push("mainnetDate");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      alert("Please fill all required fields before continuing.");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    alert("✅ Application submitted successfully!\n\nYou will receive a confirmation email within 24 hours.\n\nThank you for applying!");
    window.location.href = "/";
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Subsidy Application
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
              Apply for Audit Subsidy
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete this step-by-step application to secure up to $50k in audit subsidies
          </p>
        </motion.div>

        <Card className="p-6 mb-8 border-2">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-semibold text-purple-600">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center ${
                  step.number <= currentStep ? "opacity-100" : "opacity-40"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    step.number < currentStep
                      ? "bg-green-500 text-white"
                      : step.number === currentStep
                      ? "bg-gradient-to-r from-purple-600 to-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number < currentStep ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className="text-xs font-medium text-center hidden md:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 border-2 mb-6">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Project Information
                </h2>
                <p className="text-gray-600">Tell us about your Solana project</p>
              </div>

              <div>
                <Label htmlFor="projectName" className="text-base font-semibold">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => updateFormData("projectName", e.target.value)}
                  placeholder="e.g., SuperSwap DeFi Protocol"
                  className={`mt-2 h-12 ${errors.includes("projectName") ? "border-red-500" : ""}`}
                />
                {errors.includes("projectName") && (
                  <p className="text-red-500 text-sm mt-1">Project name is required</p>
                )}
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Project Type <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["DeFi", "NFT", "Gaming", "Infrastructure", "DAO", "Other"].map((type) => (
                    <Button
                      key={type}
                      variant={formData.projectType === type ? "default" : "outline"}
                      className={`h-auto py-4 ${
                        formData.projectType === type
                          ? "bg-gradient-to-r from-purple-600 to-green-600"
                          : ""
                      }`}
                      onClick={() => updateFormData("projectType", type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
                {errors.includes("projectType") && (
                  <p className="text-red-500 text-sm mt-1">Project type is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="websiteUrl" className="text-base font-semibold">
                  Website / Landing Page
                </Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => updateFormData("websiteUrl", e.target.value)}
                  placeholder="https://yourproject.com"
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="githubUrl" className="text-base font-semibold">
                  GitHub Repository <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => updateFormData("githubUrl", e.target.value)}
                  placeholder="https://github.com/yourproject/repo"
                  className={`mt-2 h-12 ${errors.includes("githubUrl") ? "border-red-500" : ""}`}
                />
                {errors.includes("githubUrl") && (
                  <p className="text-red-500 text-sm mt-1">GitHub URL is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="twitterUrl" className="text-base font-semibold">
                  Twitter / X Profile
                </Label>
                <Input
                  id="twitterUrl"
                  type="url"
                  value={formData.twitterUrl}
                  onChange={(e) => updateFormData("twitterUrl", e.target.value)}
                  placeholder="https://twitter.com/yourproject"
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-semibold">
                  Project Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  placeholder="Describe your project, its purpose, and how it adds value to the Solana ecosystem..."
                  className="mt-2 min-h-32"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  Team Details
                </h2>
                <p className="text-gray-600">Tell us about your team</p>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Team Size <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["1-2", "3-5", "6-10", "10+"].map((size) => (
                    <Button
                      key={size}
                      variant={formData.teamSize === size ? "default" : "outline"}
                      className={
                        formData.teamSize === size
                          ? "bg-gradient-to-r from-purple-600 to-green-600"
                          : ""
                      }
                      onClick={() => updateFormData("teamSize", size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                {errors.includes("teamSize") && (
                  <p className="text-red-500 text-sm mt-1">Team size is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="teamLead" className="text-base font-semibold">
                  Team Lead / Contact Person <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="teamLead"
                  value={formData.teamLead}
                  onChange={(e) => updateFormData("teamLead", e.target.value)}
                  placeholder="Full name"
                  className={`mt-2 h-12 ${errors.includes("teamLead") ? "border-red-500" : ""}`}
                />
                {errors.includes("teamLead") && (
                  <p className="text-red-500 text-sm mt-1">Team lead name is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="teamEmail" className="text-base font-semibold">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="teamEmail"
                  type="email"
                  value={formData.teamEmail}
                  onChange={(e) => updateFormData("teamEmail", e.target.value)}
                  placeholder="contact@yourproject.com"
                  className={`mt-2 h-12 ${errors.includes("teamEmail") ? "border-red-500" : ""}`}
                />
                {errors.includes("teamEmail") && (
                  <p className="text-red-500 text-sm mt-1">Contact email is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="teamExperience" className="text-base font-semibold">
                  Team Experience
                </Label>
                <Textarea
                  id="teamExperience"
                  value={formData.teamExperience}
                  onChange={(e) => updateFormData("teamExperience", e.target.value)}
                  placeholder="Describe your team's experience with Solana, blockchain development, and relevant projects..."
                  className="mt-2 min-h-32"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Code className="w-6 h-6 text-purple-600" />
                  Technical Details
                </h2>
                <p className="text-gray-600">Information about your code and development</p>
              </div>

              <div>
                <Label htmlFor="linesOfCode" className="text-base font-semibold">
                  Approximate Lines of Code
                </Label>
                <Input
                  id="linesOfCode"
                  type="number"
                  value={formData.linesOfCode}
                  onChange={(e) => updateFormData("linesOfCode", e.target.value)}
                  placeholder="5000"
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Project Complexity
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Low", "Medium", "High", "Critical"].map((level) => (
                    <Button
                      key={level}
                      variant={formData.complexity === level ? "default" : "outline"}
                      className={
                        formData.complexity === level
                          ? "bg-gradient-to-r from-purple-600 to-green-600"
                          : ""
                      }
                      onClick={() => updateFormData("complexity", level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="testCoverage" className="text-base font-semibold">
                  Test Coverage (%)
                </Label>
                <Input
                  id="testCoverage"
                  type="number"
                  value={formData.testCoverage}
                  onChange={(e) => updateFormData("testCoverage", e.target.value)}
                  placeholder="85"
                  className="mt-2 h-12"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="mainnetDate" className="text-base font-semibold">
                  Planned Mainnet Launch Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mainnetDate"
                  type="date"
                  value={formData.mainnetDate}
                  onChange={(e) => updateFormData("mainnetDate", e.target.value)}
                  className={`mt-2 h-12 ${errors.includes("mainnetDate") ? "border-red-500" : ""}`}
                />
                {errors.includes("mainnetDate") && (
                  <p className="text-red-500 text-sm mt-1">Launch date is required</p>
                )}
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Documentation Required</p>
                    <p>
                      Make sure your GitHub repository includes comprehensive documentation,
                      deployment instructions, and architecture diagrams.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                  Budget & Timeline
                </h2>
                <p className="text-gray-600">Financial and timing details</p>
              </div>

              <div>
                <Label htmlFor="requestedSubsidy" className="text-base font-semibold">
                  Requested Subsidy Amount
                </Label>
                <Input
                  id="requestedSubsidy"
                  type="number"
                  value={formData.requestedSubsidy}
                  onChange={(e) => updateFormData("requestedSubsidy", e.target.value)}
                  placeholder="25000"
                  className="mt-2 h-12"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Maximum: $50,000 (30% of audit cost)
                </p>
              </div>

              <div>
                <Label htmlFor="auditBudget" className="text-base font-semibold">
                  Total Audit Budget
                </Label>
                <Input
                  id="auditBudget"
                  type="number"
                  value={formData.auditBudget}
                  onChange={(e) => updateFormData("auditBudget", e.target.value)}
                  placeholder="80000"
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Preferred Timeline
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "standard", label: "Standard", desc: "4-6 weeks" },
                    { value: "expedited", label: "Expedited", desc: "2-3 weeks" },
                    { value: "emergency", label: "Emergency", desc: "< 2 weeks" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={formData.preferredTimeline === option.value ? "default" : "outline"}
                      className={`h-auto py-4 flex-col ${
                        formData.preferredTimeline === option.value
                          ? "bg-gradient-to-r from-purple-600 to-green-600"
                          : ""
                      }`}
                      onClick={() => updateFormData("preferredTimeline", option.value)}
                    >
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-xs opacity-80 mt-1">{option.desc}</div>
                    </Button>
                  ))}
                </div>
              </div>

              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-900">
                    <p className="font-semibold mb-1">Estimated Savings</p>
                    <p>
                      Based on your budget, you could save up to{" "}
                      <strong>
                        ${Math.min(parseInt(formData.auditBudget) * 0.3 || 0, 50000).toLocaleString()}
                      </strong>{" "}
                      with the 30% subsidy!
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                  Review Your Application
                </h2>
                <p className="text-gray-600">Please review all information before submitting</p>
              </div>

              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Project Information</h3>
                  <div className="space-y-3">
                    <ReviewItem label="Project Name" value={formData.projectName} />
                    <ReviewItem label="Type" value={formData.projectType} />
                    <ReviewItem label="Website" value={formData.websiteUrl} />
                    <ReviewItem label="GitHub" value={formData.githubUrl} />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Team Details</h3>
                  <div className="space-y-3">
                    <ReviewItem label="Team Size" value={formData.teamSize} />
                    <ReviewItem label="Team Lead" value={formData.teamLead} />
                    <ReviewItem label="Email" value={formData.teamEmail} />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Technical</h3>
                  <div className="space-y-3">
                    <ReviewItem label="Lines of Code" value={formData.linesOfCode} />
                    <ReviewItem label="Complexity" value={formData.complexity} />
                    <ReviewItem label="Launch Date" value={formData.mainnetDate} />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Budget</h3>
                  <div className="space-y-3">
                    <ReviewItem
                      label="Requested Subsidy"
                      value={`$${parseInt(formData.requestedSubsidy || "0").toLocaleString()}`}
                    />
                    <ReviewItem
                      label="Total Budget"
                      value={`$${parseInt(formData.auditBudget || "0").toLocaleString()}`}
                    />
                    <ReviewItem label="Timeline" value={formData.preferredTimeline} />
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-r from-purple-50 to-green-50 border-2 border-purple-200">
                <div className="flex gap-4">
                  <Sparkles className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Ready to Submit?</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      By submitting this application, you confirm that all information provided is
                      accurate and complete. The expert panel will review your application within
                      1-2 weeks.
                    </p>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>All required fields completed</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </Card>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="h-12 px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-green-600 h-12 px-6"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-600 to-purple-600 h-12 px-8"
            >
              Submit Application
              <CheckCircle2 className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help?{" "}
            <Link href="/faq" className="text-purple-600 hover:underline font-medium">
              View FAQ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value || "Not provided"}</span>
    </div>
  );
}