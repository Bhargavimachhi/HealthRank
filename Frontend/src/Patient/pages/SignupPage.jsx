import React, { useState } from "react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Shield, Mail } from "lucide-react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [authMethod, setAuthMethod] = useState("phone");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 new

  const handleSendOTP = (e) => {
    e.preventDefault();
    setError("");

    if (!mobileNumber || mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setShowOTP(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") {
        localStorage.setItem("userMobile", mobileNumber);
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = isSignup ? "/patient-form" : "/homepage";
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }, 1000);
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = isSignup ? "/patient-form" : "/homepage";
    }, 1000);
  };

  const resetForm = () => {
    setShowOTP(false);
    setMobileNumber("");
    setOtp("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-1 rounded-full bg-gradient-to-r from-blue-600 to-green-600">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <img
                  src="/src/assets/health rank logo.png"
                  alt="Health Rank Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HealthTriage</h1>
          <p className="text-gray-600">Smart Patient Care & Assessment</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-4">
            <Tabs
              defaultValue="login"
              onValueChange={(value) => {
                setIsSignup(value === "signup");
                resetForm();
              }}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <CardTitle className="text-xl mb-1">Welcome Back</CardTitle>
                <CardDescription>
                  Log in using phone OTP or email and password.
                </CardDescription>
              </TabsContent>

              <TabsContent value="signup">
                <CardTitle className="text-xl mb-1">Create Account</CardTitle>
                <CardDescription>
                  Sign up with your preferred method below.
                </CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center gap-4">
              <Button
                variant={authMethod === "phone" ? "default" : "outline"}
                onClick={() => {
                  setAuthMethod("phone");
                  resetForm();
                }}
              >
                Phone
              </Button>
              <Button
                variant={authMethod === "email" ? "default" : "outline"}
                onClick={() => {
                  setAuthMethod("email");
                  resetForm();
                }}
              >
                Email
              </Button>
            </div>

            {/* Phone Auth */}
            {authMethod === "phone" &&
              (!showOTP ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <Label>Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) =>
                        setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button className="w-full h-12" disabled={isLoading}>
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <Label>Enter OTP</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="pl-10 h-12 text-center text-lg tracking-widest"
                    />
                  </div>
                  <p className="text-sm text-gray-600">OTP sent to +91 {mobileNumber}</p>
                  <Button className="w-full h-12" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <Button variant="outline" className="w-full h-12" onClick={resetForm}>
                    Change Mobile Number
                  </Button>
                </form>
              ))}

            {/* Email Auth */}
            {authMethod === "email" && (
              <form onSubmit={handleEmailAuth} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-10"
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

                <Button className="w-full h-12" disabled={isLoading}>
                  {isSignup
                    ? isLoading
                      ? "Creating account..."
                      : "Sign Up"
                    : isLoading
                    ? "Logging in..."
                    : "Login"}
                </Button>
              </form>
            )}

            <div className="text-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">Demo OTP: 123456</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
