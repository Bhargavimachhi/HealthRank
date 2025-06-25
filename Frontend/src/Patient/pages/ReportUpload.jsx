import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  Activity,
  Clock,
  Pill,
  ArrowLeft,
  Stethoscope,
} from "lucide-react";
import { useUserContext } from "../../../context/userContext";
import { uploadFile, fetchFile } from "../../../fileUpload";
import axios from "axios";

export default function ReportUploadPage() {
  const { userData } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    reportType: "",
    reportFile: null,
    symptoms: "",
    symptomDuration: "",
    painScale: [5],
    medications: [],
  });

  const reportTypes = [
    { value: "bloodCount", label: "Complete Blood Count Report", icon: "🩸" },
    { value: "serumCreatinine", label: "Serum Creatinine Report", icon: "🫘" },
    { value: "bloodSugar", label: "Random Blood Sugar", icon: "🍯" },
    { value: "urine", label: "Urine Routine Micro Report", icon: "💧" },
    { value: "electrolyte", label: "Serum Electrolytes Report", icon: "⚡" },
  ];

  const commonMedications = [
    "Paracetamol",
    "Ibuprofen",
    "Aspirin",
    "Metformin",
    "Lisinopril",
    "Amlodipine",
    "Atorvastatin",
    "Omeprazole",
    "Levothyroxine",
    "Metoprolol",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a PDF or image file (JPG, PNG)");
        return;
      }

      if (file.size > maxSize) {
        setError("File size must be less than 10MB");
        return;
      }

      setFormData((prev) => ({ ...prev, reportFile: file }));
      setError("");
    }
  };

  const handleMedicationChange = (medication, checked) => {
    setFormData((prev) => ({
      ...prev,
      medications: checked
        ? [...prev.medications, medication]
        : prev.medications.filter((m) => m !== medication),
    }));
  };

  const calculateProgress = () => {
    let progress = 0;
    if (formData.reportType) progress += 25;
    if (formData.reportFile) progress += 25;
    if (formData.symptoms) progress += 25;
    if (formData.symptomDuration) progress += 25;
    return progress;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.reportType) {
      setError("Please select a report type");
      return;
    }

    if (!formData.reportFile) {
      setError("Please upload a report file");
      return;
    }

    if (!formData.symptoms.trim()) {
      setError("Please describe your symptoms");
      return;
    }

    if (!formData.symptomDuration.trim()) {
      setError("Please specify symptom duration");
      return;
    }

    setIsLoading(true);

    try {
      await uploadFile(formData.reportFile, `/patient/${userData._id}/${formData.reportType}/${userData.reports[formData.reportType].length+1}`);
      const url = await fetchFile(`/patient/${userData._id}/${formData.reportType}/${userData.reports[formData.reportType].length+1}`);
      const res =await axios.post(`http://localhost:5000/patient/${userData._id}/upload-report`, {
        patient : userData._id,
        type : formData.reportType,
        file : url,
        result : {temp : "temp"},
        triageLevel : "normal" 
      });
    } catch (err) {
      console.log(err);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.reportType || !formData.reportFile)) {
      setError("Please select report type and upload file");
      return;
    }
    setError("");
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-white">
              <img
                src="/src/assets/health rank logo.png"
                alt="Health Rank Logo"
                className="h-12 w-12 object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Upload Medical Report
          </h1>
          <p className="text-gray-600 mt-2">
            Get instant triage assessment for your health reports
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  Medical Report & Symptoms
                </CardTitle>
                <CardDescription>
                  Step {currentStep} of 2 -{" "}
                  {currentStep === 1 ? "Upload Report" : "Describe Symptoms"}
                </CardDescription>
              </div>
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            <div className="mt-4">
              <Progress value={(currentStep / 2) * 100} className="h-2" />
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Report Type Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Select Report Type
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {reportTypes.map((type) => (
                        <Card
                          key={type.value}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            formData.reportType === type.value
                              ? "ring-2 ring-blue-500 bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              reportType: type.value,
                            }))
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{type.icon}</span>
                              <span className="font-medium text-sm">
                                {type.label}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Upload className="h-5 w-5 text-blue-600" />
                      Upload Report File
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <Label htmlFor="reportFile" className="cursor-pointer">
                          <span className="text-blue-600 font-medium hover:text-blue-700">
                            Click to upload
                          </span>
                          <span className="text-gray-600">
                            {" "}
                            or drag and drop
                          </span>
                        </Label>
                        <p className="text-sm text-gray-500">
                          PDF, PNG, JPG up to 10MB
                        </p>
                      </div>
                      <Input
                        id="reportFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    {formData.reportFile && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-green-600" />
                          <span className="text-green-800 font-medium">
                            {formData.reportFile.name}
                          </span>
                          <span className="text-green-600 text-sm">
                            (
                            {(formData.reportFile.size / 1024 / 1024).toFixed(
                              2
                            )}{" "}
                            MB)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Symptoms Description */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Describe Your Symptoms
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="symptoms">Current Symptoms *</Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Please describe your current symptoms in detail..."
                        value={formData.symptoms}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            symptoms: e.target.value,
                          }))
                        }
                        rows={4}
                        className="resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Symptom Duration */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Symptom Duration
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="duration">
                        How long have you been experiencing these symptoms? *
                      </Label>
                      <Select
                        value={formData.symptomDuration}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            symptomDuration: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less-than-day">
                            Less than a day
                          </SelectItem>
                          <SelectItem value="1-3-days">1-3 days</SelectItem>
                          <SelectItem value="4-7-days">4-7 days</SelectItem>
                          <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                          <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                          <SelectItem value="more-than-month">
                            More than a month
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Pain Scale */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Pain Level (Optional)
                    </h3>
                    <div className="space-y-4">
                      <Label>
                        Rate your pain level from 1 (no pain) to 10 (severe
                        pain)
                      </Label>
                      <div className="px-4">
                        <Slider
                          value={formData.painScale}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              painScale: value,
                            }))
                          }
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>1 - No pain</span>
                          <span className="font-medium text-blue-600">
                            Current: {formData.painScale[0]}
                          </span>
                          <span>10 - Severe pain</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Medications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Pill className="h-5 w-5 text-blue-600" />
                      Current Medications (Optional)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {commonMedications.map((medication) => (
                        <div
                          key={medication}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={medication}
                            checked={formData.medications.includes(medication)}
                            onCheckedChange={(checked) =>
                              handleMedicationChange(medication, checked)
                            }
                          />
                          <Label htmlFor={medication} className="text-sm">
                            {medication}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.medications.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Selected: {formData.medications.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {currentStep === 1 ? (
                  <>
                    <Button type="button" variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button type="button" className="flex-1" onClick={nextStep}>
                      Next: Symptoms
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#007ac2] to-[#33c2a6] hover:from-[#0062a0] hover:to-[#2ea88f] px-6 py-2 text-white text-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Submit & Get Triage"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
