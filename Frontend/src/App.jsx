import { Button } from "./components/ui/button";
import { ArrowRight, Check, Code } from "lucide-react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Patient/pages/Homepage";

import ReportUpload from "./Patient/pages/ReportUpload";
import TriageResult from "./Patient/pages/TriageResult";
import PatientDetailsPage from "./Patient/pages/PatientDetailPage";
import PatientFormPage from "./Patient/pages/PatientForm";
import LandingPage from "./LandingPage";
import DashboardPage from "./Doctor/pages/DashBoardPage";
import { Toaster } from "react-hot-toast";
import PatientLoginPage from "./Patient/pages/PatientLoginPage";
import DoctorLoginPage from "./Doctor/pages/DoctorLoginPage";
import LoginPage from "./Authentication/pages/LoginPage"
import SignupPage from "./Authentication/pages/SignupPage";

export default function HackerTemplateSuccess() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/patient" element={<PatientFormPage />} />
        <Route path="/login/patient" element={<PatientLoginPage />} />
        <Route path="/report-upload" element={<ReportUpload />} />
        <Route path="/triage-result" element={<TriageResult />} />
        <Route path="/patient-details" element={<PatientDetailsPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login/doctor" element={<DoctorLoginPage />} />
      </Routes>
    </Router>
  );
}
