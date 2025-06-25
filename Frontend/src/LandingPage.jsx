import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Stethoscope,
  FolderHeart,
  Brain,
  History,
  Mic,
  Languages,
  UserCheck,
  Hospital,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      title: "Organized Report Storage",
      desc: "Store medical reports by category like blood count, sugar levels, etc., for easy access.",
      icon: <FolderHeart className="h-6 w-6 text-green-600" />,
    },
    {
      title: "AI-Based Triage",
      desc: "Automatically analyze new reports, assign urgency levels, and suggest next steps.",
      icon: <Brain className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Report History & Insights",
      desc: "Track health over time with AI-generated insights for each report type.",
      icon: <History className="h-6 w-6 text-yellow-600" />,
    },
    {
      title: "Doctor Remarks Post Consultation",
      desc: "Doctors can add consultation notes to help maintain a detailed health history.",
      icon: <UserCheck className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Text-to-Speech",
      desc: "Let the app read out reports and instructions for better accessibility.",
      icon: <Mic className="h-6 w-6 text-pink-600" />,
    },
    {
      title: "Language Support",
      desc: "Receive medical explanations in your preferred language for full understanding.",
      icon: <Languages className="h-6 w-6 text-red-600" />,
    },
  ];

  const redirectTo = (role) => {
    if (role === "doctor") {
      window.location.href = "/login/doctor";
    } else {
      window.location.href = "/login/patient";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex flex-wrap justify-between items-center px-4 md:px-8 py-4 shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div>
            <img
              src="./src/assets/health rank logo.png"
              alt="Health Rank Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <span className="text-lg md:text-xl font-bold text-gray-800">HealthTriage</span>
        </div>

        <div className="flex gap-2 md:gap-4 mt-4 md:mt-0 flex-wrap justify-center">
          <Button
            className="bg-gradient-to-r from-[#007ac2] to-[#33c2a6] hover:from-[#0062a0] hover:to-[#2ea88f] px-4 py-2 text-white text-sm"
            onClick={() => redirectTo("patient")}
          >
            Patient Login
          </Button>
          <Button
            className="bg-gradient-to-r from-[#33c2a6] to-[#007ac2] hover:from-[#2ea88f] hover:to-[#0062a0] px-4 py-2 text-white text-sm"
            onClick={() => redirectTo("doctor")}
          >
            Doctor Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-4 md:px-6 py-16 md:py-24 space-y-8">
        <div className="mx-auto h-20 w-20">
          <img
            src="./src/assets/health rank logo.png"
            alt="Health Rank Logo"
            className="h-full w-full object-contain"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-10 md:mb-20">Your Health, Smarter</h1>

        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-10">
          HealthTriage leverages AI to make patient care seamless—from report
          analysis to consultations and history tracking.
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Button
            className="bg-gradient-to-r from-[#007ac2] to-[#33c2a6] hover:from-[#0062a0] hover:to-[#2ea88f] px-6 md:px-10 py-3 md:py-4 text-base md:text-lg text-white"
            onClick={() => redirectTo("patient")}
          >
            Patient Get Started
          </Button>
          <Button
            className="bg-gradient-to-r from-[#33c2a6] to-[#007ac2] hover:from-[#2ea88f] hover:to-[#0062a0] px-6 md:px-10 py-3 md:py-4 text-base md:text-lg text-white"
            onClick={() => redirectTo("doctor")}
          >
            Doctor Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-6 py-16 md:py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader className="flex flex-row items-center space-x-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-blue-50 to-green-50 text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">Why Choose HealthTriage?</h2>
        <p className="text-gray-700 max-w-4xl mx-auto text-base md:text-lg">
          HealthTriage is built with a patient-first approach. By combining AI
          analysis with intuitive UI design, it empowers patients and doctors to
          make informed decisions quickly and confidently. With multilingual
          support and text-to-speech, it's built for everyone.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Button
            className="bg-gradient-to-r from-[#33c2a6] to-[#007ac2] hover:from-[#2ea88f] hover:to-[#0062a0] px-6 md:px-10 py-3 md:py-4 text-base md:text-lg text-white"
            onClick={() => redirectTo("patient")}
          >
            Explore as Patient
          </Button>
          <Button
            className="bg-gradient-to-r from-[#007ac2] to-[#33c2a6] hover:from-[#0062a0] hover:to-[#2ea88f] px-6 md:px-10 py-3 md:py-4 text-base md:text-lg text-white"
            onClick={() => redirectTo("doctor")}
          >
            Explore as Doctor
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-white text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-left">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">1. Upload Reports</h3>
            <p className="text-gray-600">
              Patients upload medical reports categorized by type. Our system
              stores them securely and neatly.
            </p>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              2. Triage and Analysis
            </h3>
            <p className="text-gray-600">
              AI reviews new reports, assigns health levels, and gives
              personalized recommendations.
            </p>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              3. Consultation & Records
            </h3>
            <p className="text-gray-600">
              Doctors access report history, add notes post-consultation, and
              ensure a complete care cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Partners or Hospitals Section */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-br from-green-50 to-blue-100 text-center space-y-6">
        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#007ac2] to-[#33c2a6] p-2 rounded-full flex items-center justify-center">
          <Hospital className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">For Hospitals & Clinics</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg">
          HealthTriage helps clinics and hospitals manage patient records,
          improve triage response, and ensure follow-up care. Join us to bring
          modern care to every doorstep.
        </p>
        <Button
          className="bg-gradient-to-r from-[#007ac2] to-[#33c2a6] hover:from-[#0062a0] hover:to-[#2ea88f] px-6 md:px-10 py-3 md:py-4 text-base md:text-lg text-white"
          onClick={() => redirectTo("doctor")}
        >
          Partner With Us
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t text-center py-6 md:py-8 text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} HealthTriage. All rights reserved.
      </footer>
    </div>
  );
}
