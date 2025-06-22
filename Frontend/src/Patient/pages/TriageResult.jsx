import React, { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
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
} from "lucide-react"

export default function TriageResultPage() {
  // Dummy report data
  const dummyReport = {
    reportType: "cbc",
    symptoms: "Mild headache, fatigue",
    symptomDuration: "1-3-days",
    painScale: [3],
    medications: ["Paracetamol", "Vitamin D"],
    uploadDate: "2024-06-20T10:30:00Z",
    fileName: "cbc_report_june.pdf",
  }

  const [reportData, setReportData] = useState(null)
  const [triageResult, setTriageResult] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Use dummy report instead of fetching from storage
    setReportData(dummyReport)

    setTimeout(() => {
      const result = generateTriageResult(dummyReport)
      setTriageResult(result)
      setIsLoading(false)
    }, 2000)
  }, [])

  const generateTriageResult = (report) => {
    const painLevel = report.painScale[0]
    const symptoms = report.symptoms.toLowerCase()
    const duration = report.symptomDuration

    if (
      symptoms.includes("chest pain") ||
      symptoms.includes("difficulty breathing") ||
      symptoms.includes("severe headache") ||
      painLevel >= 8 ||
      symptoms.includes("blood")
    ) {
      return {
        level: "High",
        color: "bg-red-500",
        icon: <AlertTriangle className="h-6 w-6 text-white" />,
        reasons: [
          "High pain level reported (8+/10)",
          "Symptoms may indicate serious condition",
          "Immediate medical attention recommended",
        ],
        recommendations: [
          "Go to Emergency Room immediately",
          "Call emergency services if symptoms worsen",
          "Do not delay seeking medical care",
        ],
        urgency: "Immediate attention required",
      }
    }

    if (
      painLevel >= 5 ||
      symptoms.includes("fever") ||
      symptoms.includes("nausea") ||
      duration.includes("week") ||
      symptoms.includes("persistent")
    ) {
      return {
        level: "Medium",
        color: "bg-yellow-500",
        icon: <Clock className="h-6 w-6 text-white" />,
        reasons: [
          "Moderate pain level or concerning symptoms",
          "Symptoms persisting for extended period",
          "Medical evaluation recommended",
        ],
        recommendations: [
          "Schedule appointment with physician within 24-48 hours",
          "Monitor symptoms closely",
          "Seek immediate care if symptoms worsen",
        ],
        urgency: "Medical consultation within 24-48 hours",
      }
    }

    return {
      level: "Low",
      color: "bg-green-500",
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      reasons: ["Mild symptoms reported", "Low pain level", "Likely manageable with self-care"],
      recommendations: [
        "Continue monitoring symptoms",
        "Practice self-care measures",
        "Schedule routine follow-up if needed",
        "Contact healthcare provider if symptoms persist or worsen",
      ],
      urgency: "Routine care or self-management",
    }
  }

  const getReportTypeLabel = (type) => {
    const types = {
      cbc: "Complete Blood Count Report",
      creatinine: "Serum Creatinine Report",
      "blood-sugar": "Random Blood Sugar",
      urine: "Urine Routine Micro Report",
      electrolytes: "Serum Electrolytes Report",
    }
    return types[type] || type
  }

  const getDurationLabel = (duration) => {
    const durations = {
      "less-than-day": "Less than a day",
      "1-3-days": "1-3 days",
      "4-7-days": "4-7 days",
      "1-2-weeks": "1-2 weeks",
      "2-4-weeks": "2-4 weeks",
      "more-than-month": "More than a month",
    }
    return durations[duration] || duration
  }

  if (isLoading || !reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Report</h2>
          <p className="text-gray-600">Our AI is processing your medical data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
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
                {triageResult && (
                  <>
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center gap-3 px-6 py-4 rounded-full ${triageResult.color} text-white mb-4`}
                      >
                        {triageResult.icon}
                        <span className="text-2xl font-bold">{triageResult.level} Priority</span>
                      </div>
                      <p className="text-lg text-gray-700 font-medium">{triageResult.urgency}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Reasons for This Assessment
                      </h3>
                      <ul className="space-y-2">
                        {triageResult.reasons.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2">
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
                        {triageResult.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-600 text-sm font-medium">{index + 1}</span>
                            </div>
                            <span className="text-gray-700">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {triageResult.level === "High" && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          <strong>Important:</strong> This assessment indicates you may need immediate medical
                          attention. Please contact emergency services or visit the nearest emergency room.
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-16 flex-col gap-2" onClick={() => window.location.href = "/home"}>
                    <Home className="h-6 w-6" />
                    Back to Homepage
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex-col gap-2"
                    onClick={() => window.location.href = "/report-upload"}
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
                  <p className="text-gray-900">{getReportTypeLabel(reportData.reportType)}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">File Uploaded</Label>
                  <p className="text-gray-900 text-sm">{reportData.fileName}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Upload Date</Label>
                  <p className="text-gray-900">{new Date(reportData.uploadDate).toLocaleDateString()}</p>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium text-gray-600">Symptoms</Label>
                  <p className="text-gray-900 text-sm">{reportData.symptoms}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Duration</Label>
                  <p className="text-gray-900">{getDurationLabel(reportData.symptomDuration)}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Pain Level</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">{reportData.painScale[0]}/10</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(reportData.painScale[0] / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {reportData.medications.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Current Medications</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {reportData.medications.map((med, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {med}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
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
  )
}

function Label({ className, children, ...props }) {
  return (
    <label className={`text-sm font-medium ${className || ""}`} {...props}>
      {children}
    </label>
  )
}