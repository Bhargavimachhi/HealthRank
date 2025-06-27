import { Button } from "./components/ui/button";
import { ArrowRight, Check, Code } from "lucide-react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ReportUpload from "./Patient/pages/ReportUpload";
import TriageResult from "./Patient/pages/TriageResult";
import PatientDetailsPage from "./Patient/pages/PatientDetailPage";
import PatientFormPage from "./Patient/pages/PatientForm";
import LandingPage from "./LandingPage";
import DashboardPage from "./Doctor/pages/DashBoardPage";
import { Toaster } from "react-hot-toast";
import PatientLoginPage from "./Patient/pages/PatientLoginPage";
import DoctorLoginPage from "./Doctor/pages/DoctorLoginPage";
import LoginPage from "./Authentication/pages/LoginPage";
import SignupPage from "./Authentication/pages/SignupPage";
import PatientHomePage from "./Patient/pages/PatientHomepage";
import PatientLayout from "./layouts/PatientLayout";
import LoginAlert from "./components/LoginAlert";
import PastReportsPage from "./Patient/pages/PastReportsPage";
import DoctorSignupPage from "./Doctor/pages/DoctorSignupPage";
import DoctorLayout from "./layouts/DoctorLayout";

export default function HackerTemplateSuccess() {
  const healthRankAuth = JSON.parse(localStorage.getItem("healthRankAuth"));
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/patient" element={<PatientFormPage />} />
        <Route path="/signup/doctor" element={<DoctorSignupPage />} />
        <Route path="/login/doctor" element={<DoctorLoginPage />} />
        <Route path="/login/patient" element={<PatientLoginPage />} />
        
        <Route path=":reportId/triage-result" element={<TriageResult />} />

        <Route
          path="/patient"
          element={
            healthRankAuth && healthRankAuth.role == "patient" ? (
              <PatientLayout />
            ) : (
              <LoginAlert />
            )
          }
        >
          <Route path="" element={<PatientHomePage />} />
          <Route path=":id/report-upload" element={<ReportUpload />} />
          <Route path=":id/past-reports" element={<PastReportsPage />} />
        </Route>

        <Route
          path="/doctor"
          element={
            healthRankAuth && healthRankAuth.role == "doctor" ? (
              <DoctorLayout />
            ) : (
              <LoginAlert />
            )
          }
        >
          <Route path="" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
