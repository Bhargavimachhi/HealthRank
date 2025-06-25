// PatientDetailPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Users,
  Calendar,
  MapPin,
  FileText,
  Heart,
} from "lucide-react";

export default function PatientDetailsPage() {
  const navigate = useNavigate(); // ✅ replace useRouter

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    guardianName: "",
    age: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    medicalConditions: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateProgress = () => {
    const requiredFields = [
      "fullName",
      "guardianName",
      "age",
      "gender",
      "street",
      "city",
      "state",
      "pinCode",
    ];
    const filledFields = requiredFields.filter(
      (field) => formData[field].trim() !== ""
    );
    return (filledFields.length / requiredFields.length) * 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = {
      fullName: "Full Name",
      guardianName: "Guardian Name",
      age: "Age",
      gender: "Gender",
      street: "Street Address",
      city: "City",
      state: "State",
      pinCode: "PIN Code",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field].trim()) {
        setError(`${label} is required`);
        return;
      }
    }

    const age = Number.parseInt(formData.age);
    if (isNaN(age) || age < 0 || age > 150) {
      setError("Please enter a valid age");
      return;
    }

    if (formData.pinCode.length !== 6) {
      setError("PIN Code must be 6 digits");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmittedData(formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Registration
          </h1>
          <p className="text-gray-600 mt-2">
            Please provide your details to complete registration
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Fill in your details to create your patient profile
            </CardDescription>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(calculateProgress())}% Complete</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guardianName">Guardian Name *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="guardianName"
                        type="text"
                        className="pl-10"
                        value={formData.guardianName}
                        onChange={(e) =>
                          handleInputChange("guardianName", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="age"
                        type="number"
                        className="pl-10"
                        value={formData.age}
                        onChange={(e) =>
                          handleInputChange("age", e.target.value)
                        }
                        min="0"
                        max="150"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    type="text"
                    value={formData.street}
                    onChange={(e) =>
                      handleInputChange("street", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    id="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      handleInputChange("city", e.target.value)
                    }
                    required
                  />
                  <Input
                    id="state"
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) =>
                      handleInputChange("state", e.target.value)
                    }
                    required
                  />
                  <Input
                    id="pinCode"
                    type="text"
                    placeholder="PIN"
                    value={formData.pinCode}
                    onChange={(e) =>
                      handleInputChange(
                        "pinCode",
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    required
                  />
                </div>
              </div>

              {/* Medical Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medical Info
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    placeholder="List any conditions or allergies"
                    value={formData.medicalConditions}
                    onChange={(e) =>
                      handleInputChange("medicalConditions", e.target.value)
                    }
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/")}
                >
                  Back to Login
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save & Continue"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {submittedData && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Patient Summary</CardTitle>
              <CardDescription>
                Review of submitted information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div><strong>Full Name:</strong> {submittedData.fullName}</div>
              <div><strong>Guardian Name:</strong> {submittedData.guardianName}</div>
              <div><strong>Age:</strong> {submittedData.age}</div>
              <div><strong>Gender:</strong> {submittedData.gender}</div>
              <div><strong>Address:</strong> {submittedData.street}, {submittedData.city}, {submittedData.state} - {submittedData.pinCode}</div>
              <div><strong>Medical Conditions:</strong> {submittedData.medicalConditions || <em>None</em>}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
