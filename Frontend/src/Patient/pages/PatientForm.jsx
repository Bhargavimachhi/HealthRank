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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { User, Calendar, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

export default function PatientFormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateProgress = () => {
    const requiredFields = ["name", "email", "password", "birthday", "gender"];
    const filledFields = requiredFields.filter(
      (field) => formData[field].trim() !== ""
    );
    return (filledFields.length / requiredFields.length) * 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = {
      name: "Name",
      email: "Email",
      password: "Password",
      birthday: "Birthday",
      gender: "Gender",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field].trim()) {
        setError(`${label} is required`);
        return;
      }
    }

    setIsLoading(true);

    try {
      const addToFirebase = await axios.post(
        "http://localhost:5000/signup/email-password",
        { email: formData.email, password: formData.password }
      );
      const addToDB = await axios.post(
        "http://localhost:5000/patient/add",
        formData
      );
      toast.success("Sign Up Successful");
    } catch (err) {
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0">
          <div className="flex items-center justify-center space-x-3">
            <img
              src="/src/assets/health rank logo.png"
              alt="Health Rank Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Patient Registration
            </h1>
            <p className="text-gray-600 mt-2">
              Please provide your details to complete registration
            </p>
          </div>
          <hr className="m-5" />
          <CardHeader>
            <CardTitle className="text-xl">Basic Information</CardTitle>
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

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="h-12 pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
                      tabIndex={-1}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Birthday */}
                <div className="space-y-2">
                  <Label htmlFor="birthday" className="text-sm font-medium">
                    Birthday *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={(e) =>
                        handleInputChange("birthday", e.target.value)
                      }
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Gender *</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-sm">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-sm">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => navigate("/login/patient")}
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#007ac2] to-[#33c2a6] hover:from-[#0062a0] hover:to-[#2ea88f] px-6 py-2 text-white text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving Details..." : "Save & Continue"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
