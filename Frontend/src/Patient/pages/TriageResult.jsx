import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Calendar,
  FileText,
  Home,
  Plus,
  Activity,
  Loader2,
} from "lucide-react";
import { useParams } from "react-router";
import axios from "axios";
import { useUserContext } from "../../../context/userContext";

export default function TriageResultPage() {
  const report = useParams();
  const reportId = report.reportId;
 const { userData } = useUserContext();
 

  const [triageResult, setTriageResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translated, setTranslated] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/patient/report/${reportId}`);
        setTriageResult(res.data);
      } catch (err) {
        setTriageResult(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [reportId]);




  const handleTranslate = async () => {
    if (!triageResult) return;
    setIsTranslating(true);
    try {
      const response = await axios.post("http://localhost:8000/translate", {
        triage_level: triageResult.result.Triage_level,
        reason: triageResult.result.Reason,
        actions: triageResult.result.actions,
        type: triageResult.type,
      });
      setTriageResult({
        ...triageResult,
        result: {
          ...triageResult.result,
          Triage_level_original: triageResult.result.Triage_level,
          Triage_level: response.data.triage_level,
          Reason: response.data.reason,
          actions: response.data.actions,
        },
        type: response.data.type,
      });
      setTranslated(true);
    } catch (err) {
      alert("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const getTriageVisuals = (level) => {
    if (!level) return { color: "bg-gray-400", icon: <Clock className="h-6 w-6 text-white" />, label: "Unknown" };
    if (level.toLowerCase().includes("high"))
      return { color: "bg-red-500", icon: <AlertTriangle className="h-6 w-6 text-white" />, label: "High Priority" };
    if (level.toLowerCase().includes("medium"))
      return { color: "bg-yellow-500", icon: <Clock className="h-6 w-6 text-white" />, label: "Medium Priority" };
    return { color: "bg-green-500", icon: <CheckCircle className="h-6 w-6 text-white" />, label: "Low Priority" };
  };

  if (isLoading || !triageResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Report</h2>
          <p className="text-gray-600">Our AI is processing your medical data...</p>
        </div>
      </div>
    );
  }

  const { result, triageLevel, file, type, date } = triageResult;
  const visuals = getTriageVisuals(result?.Triage_level_original || result?.Triage_level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
        
          <Button
            className="mb-4"
            variant="outline"
            onClick={handleTranslate}
            disabled={isTranslating || translated}
          >
            {isTranslating ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Translating...
              </>
            ) : translated ? (
              "Translated to Gujarati"
            ) : (
              "Translate to Gujarati"
            )}
          </Button>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Triage Assessment Complete</h1>
          <p className="text-gray-600 mt-2">Based on your report and symptoms analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">Triage Assessment</CardTitle>
                <CardDescription>AI-powered health risk evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center gap-3 px-6 py-4 rounded-full ${visuals.color} text-white mb-4`}
                  >
                    {visuals.icon}
                    <span className="text-2xl font-bold">{visuals.label}</span>
                  </div>
                  <p className="text-lg text-gray-700 font-medium capitalize">
                    {result?.Triage_level?.replace("-", " ") || "Unknown"}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {triageLevel === "critical"
                      ? "Immediate medical attention recommended"
                      : triageLevel === "warning"
                      ? "Consult a doctor soon"
                      : "Routine care or self-management"}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Reasons for This Assessment
                  </h3>
                  <ul className="space-y-2">
                    {(result?.Reason || []).map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Recommended Next Steps
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-sm font-medium">1</span>
                      </div>
                      <span className="text-gray-700">{result?.actions}</span>
                    </li>
                  </ul>
                </div>

                {triageLevel === "critical" && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>Important:</strong> This assessment indicates you may need immediate medical
                      attention. Please contact emergency services or visit the nearest emergency room.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-16 flex-col gap-2" onClick={() => window.location.href = "/patient"}>
                    <Home className="h-6 w-6" />
                    Back to Homepage
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex-col gap-2"
                    onClick={() => window.location.href = `/patient/${userData._id}/report-upload`}
                  >
                    <Plus className="h-6 w-6" />
                    Upload Another Report
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Phone className="h-6 w-6" />
                    Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Report Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Report Type</Label>
                  <p className="text-gray-900 capitalize">{type}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">File Uploaded</Label>
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    View Report
                  </a>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Upload Date</Label>
                  <p className="text-gray-900">{new Date(date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 mt-6">
              <CardContent className="p-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    <strong>Medical Disclaimer:</strong> This triage assessment is for informational purposes only and
                    should not replace professional medical advice. Always consult with healthcare professionals for
                    medical decisions.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ className, children, ...props }) {
  return (
    <label className={`text-sm font-medium ${className || ""}`} {...props}>
      {children}
    </label>
  );
}