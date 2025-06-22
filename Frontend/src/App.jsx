import { Button } from "./components/ui/button"
import { ArrowRight, Check, Code } from "lucide-react"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Patient/pages/Homepage";

import ReportUpload from "./Patient/pages/ReportUpload";
import TriageResult from "./Patient/pages/TriageResult";
import PatientDetailsPage from "./Patient/pages/PatientDetailPage";
import PatientFormPage from "./Patient/pages/PatientForm";
import AuthPage from "./Patient/pages/SignupPage";


export default function HackerTemplateSuccess() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/report-upload" element={<ReportUpload />} />
        <Route path="/triage-result" element={<TriageResult />} />
        <Route path="/patient-details" element={<PatientDetailsPage />} />
        <Route path="/patient-form" element={<PatientFormPage />} />
        <Route path="/home" element={<HomePage />} />
       
      </Routes>
    </Router>
   
  )
}