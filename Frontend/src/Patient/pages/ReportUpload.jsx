import { useState } from "react";

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
    // Dynamic fields will be added here
  });

  const reportTypes = [
    { value: "bloodCount", label: "Complete Blood Count Report", icon: "🩸" },
    { value: "serumCreatinine", label: "Serum Creatinine Report", icon: "🫘" },
    { value: "bloodSugar", label: "Random Blood Sugar", icon: "🍯" },
    { value: "urine", label: "Urine Routine Micro Report", icon: "💧" },
    { value: "electrolyte", label: "Serum Electrolytes Report", icon: "⚡" },
  ];


  const questionnaires = {
     bloodCount: [
    { name: "Feeling_weak_or_tired", label: "Feeling Weak or Tired?", type: "checkbox", required: false },
    { name: "Bleeding_or_bruising_recovering_easily", label: "Bleeding or Bruising Easily?", type: "checkbox", required: false },
    { name: "Fever", label: "Fever?", type: "checkbox", required: false },
    { name: "Heart_disease_history", label: "History of Heart Disease?", type: "checkbox", required: false },
    { name: "Has_hypertension", label: "Has Hypertension?", type: "checkbox", required: false },
  ],
    serumCreatinine: [
    { name: "Has_kidney_problems", label: "Has Kidney Problems?", type: "checkbox", required: false },
    { name: "Swelling_in_legs_or_feet", label: "Swelling in Legs or Feet?", type: "checkbox", required: false },
    { name: "Urination_colour_changes", label: "Urination Colour Changes?", type: "checkbox", required: false },
    { name: "Diabetes_history", label: "Diabetes History?", type: "checkbox", required: false },
    ],
    bloodSugar: [
      {
        name: "Hours_since_symptom_started",
        label: "Hours Since Symptom Started",
        type: "number",
        required: false,
      },
      {
        name: "Feeling_weak_or_tired",
        label: "Feeling Weak or Tired?",
        type: "checkbox",
        required: false,
      },
      {
        name: "Vision_issues_or_confused",
        label: "Vision Issues or Feeling Confused?",
        type: "checkbox",
        required: false,
      },
      {
        name: "Heart_disease_history",
        label: "History of Heart Disease?",
        type: "checkbox",
        required: false,
      },
      {
        name: "Has_hypertension",
        label: "Has Hypertension?",
        type: "checkbox",
        required: false,
      },
      {
        name: "Has_kidney_problems",
        label: "Has Kidney Problems?",
        type: "checkbox",
        required: false,
      },
      {
        name: "Is_taking_diabetes_medicine_regularly",
        label: "Taking Diabetes Medicine Regularly?",
        type: "checkbox",
        required: false,
      },
    ],
    urine: [
     
    { name: "Fever", label: "Fever?", type: "checkbox", required: false },
    { name: "Pain_while_urinating", label: "Pain While Urinating?", type: "checkbox", required: false },
    { name: "Lower_abdominal_pain", label: "Lower Abdominal Pain?", type: "checkbox", required: false },
    ],
    electrolyte: [
   
    { name: "Confusion_or_drowsiness", label: "Confusion or Drowsiness?", type: "checkbox", required: false },
    { name: "Vomiting_or_dehydration", label: "Vomiting or Dehydration?", type: "checkbox", required: false },
    { name: "Seizure_history", label: "Seizure History?", type: "checkbox", required: false },
    { name: "Heart_disease_history", label: "History of Heart Disease?", type: "checkbox", required: false },
    ],
  };


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

  // Render dynamic questionnaire fields
  const renderDynamicFields = () => {
    const fields = questionnaires[formData.reportType] || [];
    return fields.map((field) => {
      if (field.type === "textarea") {
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}{field.required && " *"}</Label>
            <Textarea
              id={field.name}
              value={formData[field.name] || ""}
              onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
              required={field.required}
            />
          </div>
        );
      }
      if (field.type === "checkbox") {
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={!!formData[field.name]}
              onCheckedChange={checked => setFormData(prev => ({ ...prev, [field.name]: checked }))}
            />
            <Label htmlFor={field.name}>{field.label}</Label>
          </div>
        );
      }
      if (field.type === "number" || field.type === "text") {
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}{field.required && " *"}</Label>
            <Input
              id={field.name}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
              required={field.required}
            />
          </div>
        );
      }
      return null;
    });
  };

  // Validate required dynamic fields
  const validateDynamicFields = () => {
    const fields = questionnaires[formData.reportType] || [];
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        setError(`Please fill: ${field.label}`);
        return false;
      }
    }
    return true;
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
  if (!validateDynamicFields()) {
    return;
  }

  setIsLoading(true);

  try {
    const reportIndex = (userData.reports?.[formData.reportType]?.length || 0) + 1;
    await uploadFile(
      formData.reportFile,
      `/patient/${userData._id}/${formData.reportType}/${reportIndex}`
    );
    const url = await fetchFile(
      `/patient/${userData._id}/${formData.reportType}/${reportIndex}`
    );
    console.log("File uploaded successfully:", url);

    // Prepare only the answers for this report type
    const answers = {};
    (questionnaires[formData.reportType] || []).forEach((q) => {
      if (q.type === "checkbox") {
        answers[q.name] = formData[q.name] ? "yes" : "no";
      } else {
        answers[q.name] = formData[q.name];
      }
    });

   
    
    if (formData.reportType === "bloodSugar") {
      try {
         let bloodSugarObj = null;
        bloodSugarObj = {
          Patient_id: userData._id,
          Age: 17,
          Sex: "Male",
          S3_URL: url,
          Fasting_blood_glucose_mg_dL: 12.3,
          Hours_since_symptom_started: Number(answers.Hours_since_symptom_started),
          Feeling_weak_or_tired: answers.Feeling_weak_or_tired,
          Vision_issues_or_confused: answers.Vision_issues_or_confused,
          Heart_disease_history: answers.Heart_disease_history,
          Has_hypertension: answers.Has_hypertension,
          Has_kidney_problems: answers.Has_kidney_problems,
          Is_taking_diabetes_medicine_regularly: answers.Is_taking_diabetes_medicine_regularly,
        };
        

        const res = await axios.post("http://127.0.0.1:8000/triage_classify/Blood_sugar", bloodSugarObj);
        
        const res1 =  await axios.post(`http://localhost:5000/patient/${userData._id}/upload-report`, {
      patient: userData._id,
      type: formData.reportType,
      file: url,
      result: res.data ,
      triageLevel: "critical", 
    });
    console.log("Report uploaded successfully:", res1.data);
    window.location.href = `/${res1.data.reportId}/triage-result`;
      } catch (err) {
        setError("Failed to build Blood Sugar object.");
        console.error(err);
      }
    }

    else if (formData.reportType === "bloodCount") {
  try {
    const bloodCountObj = {
      Patient_id: userData._id,
      Age: 17,
      Sex: "Male",
      S3_URL: url,
      Hemoglobin_g_dL: 0.0,
      White_blood_cell_count_10_3_uL: 0.0,
      Platelet_count_10_3_uL: 0.0,
      Red_blood_cell_count_10_6_uL: 0.0,
      Feeling_weak_or_tired: answers.Feeling_weak_or_tired,
      Bleeding_or_bruising_recovering_easily: answers.Bleeding_or_bruising_recovering_easily,
      Fever: answers.Fever,
      Heart_disease_history: answers.Heart_disease_history,
      Has_hypertension: answers.Has_hypertension,
    };

    const res = await axios.post("http://127.0.0.1:8000/triage_classify/cbc", bloodCountObj);
    console.log("Blood Count response:", res.data);

    const res1 = await axios.post(`http://localhost:5000/patient/${userData._id}/upload-report`, {
      patient: userData._id,
      type: formData.reportType,
      file: url,
      result: res.data,
      triageLevel: res.data?.triageLevel || "critical",
    });
    window.location.href = `/${res1.data.reportId}/triage-result`;
  } catch (err) {
    setError("Failed to build Blood Count object.");
    console.error(err);
  }
}

else if (formData.reportType === "serumCreatinine") {
  try {
    const serumCreatinineObj = {
      Patient_id: userData._id,
      Age: 17,
      Sex: "Male",
      S3_URL: url,
      Serum_creatinine_mg_dL: 0.0,
      Has_kidney_problems: answers.Has_kidney_problems,
      Swelling_in_legs_or_feet: answers.Swelling_in_legs_or_feet,
      Urination_colour_changes: answers.Urination_colour_changes,
      Diabetes_history: answers.Diabetes_history,
      Urine_Frequency: "normal",
    };

    const res = await axios.post("http://localhost:8000/triage_classify/creatinine", serumCreatinineObj);

    const res1 = await axios.post(`http://localhost:5000/patient/${userData._id}/upload-report`, {
      patient: userData._id,
      type: formData.reportType,
      file: url,
      result: res.data,
      triageLevel: res.data?.triageLevel || "critical",
    });
    window.location.href = `/${res1.data.reportId}/triage-result`;
  } catch (err) {
    setError("Failed to build Serum Creatinine object.");
    console.error(err);
  }
}
else if (formData.reportType === "urine") {
  try {
    const urineObj = {
      Patient_id: userData._id,
      Age: 17,
      Sex: "Male",
      S3_URL: url,
      Urine_color: "Pale yellow",
      Urine_protein: "absent",
      Urine_glucose: "absent",  
      Pus_cells_present: "absent",
      Bacteria_presence: "absent",
      Fever: answers.Fever,
      Pain_while_urinating: answers.Pain_while_urinating,
      Lower_abdominal_pain: answers.Lower_abdominal_pain,
    };

    const res = await axios.post("http://127.0.0.1:8000/triage_classify/urine", urineObj);

    const res1 = await axios.post(`http://localhost:5000/patient/${userData._id}/upload-report`, {
      patient: userData._id,
      type: formData.reportType,
      file: url,
      result: res.data,
      triageLevel: res.data?.triageLevel || "critical",
    });
    window.location.href = `/${res1.data.reportId}/triage-result`;
  } catch (err) {
    setError("Failed to build Urine object.");
    console.error(err);
  }
}

else if (formData.reportType === "electrolyte") {
  try {
    const electrolyteObj = {
      Patient_id: userData._id,
      Age: 17,
      Sex: "Male",
      URL: url,
      Sodium_mEq_L: 0.0,
      Potassium_mEq_L: 0.0,
      Chloride_mEq_L:   0.0,
      Bicarbonate_mEq_L: 0.0,
      Confusion_or_drowsiness: answers.Confusion_or_drowsiness,
      Vomiting_or_dehydration: answers.Vomiting_or_dehydration,
      Seizure_history: answers.Seizure_history,
      Heart_disease_history: answers.Heart_disease_history,
    };

    const res = await axios.post("http://127.0.0.1:8000/triage_classify/electrolyte", electrolyteObj);

    const res1 = await axios.post(`http://localhost:5000/patient/${userData._id}/upload-report`, {
      patient: userData._id,
      type: formData.reportType,
      file: url,
      result: res.data,
      triageLevel: res.data?.triageLevel || "critical",
    });
    window.location.href = `/${res1.data.reportId}/triage-result`;
  } catch (err) {
    setError("Failed to build Electrolyte object.");
    console.error(err);
  }
}

   
  } catch (err) {
    setError("Submission failed.");
    console.error(err);
  } finally {
    setIsLoading(false);
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
                  {currentStep === 1 ? "Upload Report" : "Answer Questions"}
                </CardDescription>
              </div>
              <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1}>
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
                  {renderDynamicFields()}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {currentStep === 1 ? (
                  <>
                    <Button type="button" variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <button type="button" className="flex-1 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white font-semibold rounded-md px-6 py-2 shadow transition-colors duration-200" onClick={nextStep}>
  Next: Questions
</button>
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