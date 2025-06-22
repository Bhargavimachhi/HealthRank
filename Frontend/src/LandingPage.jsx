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
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
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

  const handleLoginPageRedirection = () => {
    navigate("/login/patient");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">HealthTriage</span>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-6 py-2 text-white text-sm"
          onClick={handleLoginPageRedirection}
        >
          Login
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-24 space-y-8">
        <div className="mx-auto h-15 w-15 bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full">
          <Stethoscope className="p-1 h-full w-full text-white" />
        </div>
        <h1 className="text-5xl font-bold mb-20">Your Health, Smarter</h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto m-20">
          HealthTriage leverages AI to make patient care seamless—from report
          analysis to consultations and history tracking.
        </p>
        <Button
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-10 py-4 text-lg"
          onClick={handleLoginPageRedirection}
        >
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="px-6 py-24 bg-gradient-to-b from-blue-50 to-green-50 text-center space-y-8">
        <h2 className="text-4xl font-bold m-20">Why Choose HealthTriage?</h2>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg m-20">
          HealthTriage is built with a patient-first approach. By combining AI
          analysis with intuitive UI design, it empowers patients and doctors to
          make informed decisions quickly and confidently. With multilingual
          support and text-to-speech, it's built for everyone.
        </p>
        <div className="flex justify-center">
          <Button
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-10 py-4 text-lg"
            onClick={handleLoginPageRedirection}
          >
            Explore More
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-24 bg-white text-center space-y-8">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-left m-20">
          <div className="m-10">
            <h3 className="text-xl font-semibold mb-2">1. Upload Reports</h3>
            <p className="text-gray-600">
              Patients upload medical reports categorized by type. Our system
              stores them securely and neatly.
            </p>
          </div>
          <div className="m-10">
            <h3 className="text-xl font-semibold mb-2">
              2. Triage and Analysis
            </h3>
            <p className="text-gray-600">
              AI reviews new reports, assigns health levels, and gives
              personalized recommendations.
            </p>
          </div>
          <div className="m-10">
            <h3 className="text-xl font-semibold mb-2">
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
      <section className="px-6 py-24 bg-gradient-to-br from-green-50 to-blue-100 text-center space-y-6">
        <div className="mx-auto h-15 w-15 bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full">
          <Hospital className="p-1 h-full w-full text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-20">For Hospitals & Clinics</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg m-20">
          HealthTriage helps clinics and hospitals manage patient records,
          improve triage response, and ensure follow-up care. Join us to bring
          modern care to every doorstep.
        </p>
        <Button
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-10 py-4 text-lg"
          onClick={handleLoginPageRedirection}
        >
          Partner With Us
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} HealthTriage. All rights reserved.
      </footer>
    </div>
  );
}
