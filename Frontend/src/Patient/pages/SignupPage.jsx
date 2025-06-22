import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Shield, Stethoscope } from "lucide-react"

// If you are not using Next.js, replace router.push with window.location.href
// Remove useRouter if not using Next.js
// import { useRouter } from "next/router"

export default function AuthPage() {
  // const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [mobileNumber, setMobileNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isSignup, setIsSignup] = useState(false)

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError("")

    if (!mobileNumber || mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    setIsLoading(true)

    // Simulate API call to send OTP
    setTimeout(() => {
      setShowOTP(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError("")

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      if (otp === "123456") {
        // Store user session
        localStorage.setItem("userMobile", mobileNumber)
        localStorage.setItem("isAuthenticated", "true")

        if (isSignup) {
          // router.push("/patient-form")
          window.location.href = "/patient-form"
        } else {
          // Check if patient details exist
          const patientData = localStorage.getItem("patientData")
          if (patientData) {
            // router.push("/homepage")
            window.location.href = "/homepage"
          } else {
            // router.push("/patient-form")
            window.location.href = "/patient-form"
          }
        }
      } else {
        setError("Invalid OTP. Please try again.")
      }
    }, 1000)
  }

  const resetForm = () => {
    setShowOTP(false)
    setMobileNumber("")
    setOtp("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full shadow-lg">
              <Stethoscope className="h-8 w-8 text-white" />
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
                setIsSignup(value === "signup")
                resetForm()
              }}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-2">
                <CardTitle className="text-xl">Welcome Back</CardTitle>
                <CardDescription>Enter your mobile number to access your account</CardDescription>
              </TabsContent>

              <TabsContent value="signup" className="space-y-2">
                <CardTitle className="text-xl">Create Account</CardTitle>
                <CardDescription>Register with your mobile number to get started</CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!showOTP ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium">
                    Mobile Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-sm font-medium">
                    Enter OTP
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="pl-10 h-12 text-center text-lg tracking-widest"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-600">OTP sent to +91 {mobileNumber}</p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>

                <Button type="button" variant="outline" className="w-full h-12" onClick={resetForm}>
                  Change Mobile Number
                </Button>
              </form>
            )}

            {showOTP && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Didn't receive OTP?</p>
                <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={handleSendOTP}>
                  Resend OTP
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">Demo Credentials</p>
              <p>OTP: 123456</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}