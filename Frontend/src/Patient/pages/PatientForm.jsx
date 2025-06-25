
// import { useState, useEffect } from "react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Progress } from "@/components/ui/progress"
// import { User, Users, Calendar, MapPin, FileText, Stethoscope } from "lucide-react"

// export default function PatientFormPage() {
  
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [formData, setFormData] = useState({
//     fullName: "",
//     guardianName: "",
//     age: "",
//     gender: "",
//     street: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     medicalConditions: "",
//   })


//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const calculateProgress = () => {
//     const requiredFields = ["fullName", "guardianName", "age", "gender", "street", "city", "state", "pinCode"]
//     const filledFields = requiredFields.filter((field) => formData[field].trim() !== "")
//     return (filledFields.length / requiredFields.length) * 100
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")

//     // Validate required fields
//     const requiredFields = {
//       fullName: "Full Name",
//       guardianName: "Guardian Name",
//       age: "Age",
//       gender: "Gender",
//       street: "Street Address",
//       city: "City",
//       state: "State",
//       pinCode: "PIN Code",
//     }

//     for (const [field, label] of Object.entries(requiredFields)) {
//       if (!formData[field].trim()) {
//         setError(`${label} is required`)
//         return
//       }
//     }

//     // Validate age
//     const age = Number.parseInt(formData.age)
//     if (isNaN(age) || age < 0 || age > 150) {
//       setError("Please enter a valid age")
//       return
//     }

//     // Validate PIN code
//     if (formData.pinCode.length !== 6) {
//       setError("PIN Code must be 6 digits")
//       return
//     }

//     setIsLoading(true)

//     // Save patient data
   
//       localStorage.setItem("patientData", JSON.stringify(formData))
//       setIsLoading(false)
//       window.location.href = "/home"
    
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
    
//     {/* ✅ Logo/Header Section */}
//     <div className="flex items-center justify-center space-x-3 mb-8">
//       <img
//         src="./src/assets/health rank logo.png"
//         alt="Health Rank Logo"
//         className="h-12 w-auto object-contain"
//       />
//     </div>

//     <div className="max-w-2xl mx-auto">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Patient Registration</h1>
//         <p className="text-gray-600 mt-2">
//           Please provide your details to complete registration
//         </p>
//       </div>

//         <Card className="shadow-xl border-0">
//           <CardHeader>
//             <CardTitle className="text-xl">Personal Information</CardTitle>
//             <CardDescription>Fill in your details to create your patient profile</CardDescription>
//             <div className="mt-4">
//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>Progress</span>
//                 <span>{Math.round(calculateProgress())}% Complete</span>
//               </div>
//               <Progress value={calculateProgress()} className="h-2" />
//             </div>
//           </CardHeader>

//           <CardContent>
//             {error && (
//               <Alert variant="destructive" className="mb-6">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Personal Details */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//                   <User className="h-5 w-5 text-blue-600" />
//                   Personal Details
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="fullName" className="text-sm font-medium">
//                       Full Name *
//                     </Label>
//                     <Input
//                       id="fullName"
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={formData.fullName}
//                       onChange={(e) => handleInputChange("fullName", e.target.value)}
//                       className="h-11"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="guardianName" className="text-sm font-medium">
//                       Guardian Name *
//                     </Label>
//                     <div className="relative">
//                       <Users className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="guardianName"
//                         type="text"
//                         placeholder="Father's/Mother's name"
//                         value={formData.guardianName}
//                         onChange={(e) => handleInputChange("guardianName", e.target.value)}
//                         className="pl-10 h-11"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="age" className="text-sm font-medium">
//                       Age *
//                     </Label>
//                     <div className="relative">
//                       <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                       <Input
//                         id="age"
//                         type="number"
//                         placeholder="Enter your age"
//                         value={formData.age}
//                         onChange={(e) => handleInputChange("age", e.target.value)}
//                         className="pl-10 h-11"
//                         min="0"
//                         max="150"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <Label className="text-sm font-medium">Gender *</Label>
//                     <RadioGroup
//                       value={formData.gender}
//                       onValueChange={(value) => handleInputChange("gender", value)}
//                       className="flex gap-6"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="male" id="male" />
//                         <Label htmlFor="male" className="text-sm">
//                           Male
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="female" id="female" />
//                         <Label htmlFor="female" className="text-sm">
//                           Female
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="other" id="other" />
//                         <Label htmlFor="other" className="text-sm">
//                           Other
//                         </Label>
//                       </div>
//                     </RadioGroup>
//                   </div>
//                 </div>
//               </div>

//               {/* Address Details */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//                   <MapPin className="h-5 w-5 text-blue-600" />
//                   Address Information
//                 </h3>

//                 <div className="space-y-2">
//                   <Label htmlFor="street" className="text-sm font-medium">
//                     Street Address *
//                   </Label>
//                   <Input
//                     id="street"
//                     type="text"
//                     placeholder="House number, street name"
//                     value={formData.street}
//                     onChange={(e) => handleInputChange("street", e.target.value)}
//                     className="h-11"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="city" className="text-sm font-medium">
//                       City *
//                     </Label>
//                     <Input
//                       id="city"
//                       type="text"
//                       placeholder="City"
//                       value={formData.city}
//                       onChange={(e) => handleInputChange("city", e.target.value)}
//                       className="h-11"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="state" className="text-sm font-medium">
//                       State *
//                     </Label>
//                     <Input
//                       id="state"
//                       type="text"
//                       placeholder="State"
//                       value={formData.state}
//                       onChange={(e) => handleInputChange("state", e.target.value)}
//                       className="h-11"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="pinCode" className="text-sm font-medium">
//                       PIN Code *
//                     </Label>
//                     <Input
//                       id="pinCode"
//                       type="text"
//                       placeholder="6-digit PIN"
//                       value={formData.pinCode}
//                       onChange={(e) => handleInputChange("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))}
//                       className="h-11"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Medical History */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//                   <FileText className="h-5 w-5 text-blue-600" />
//                   Medical Information
//                 </h3>

//                 <div className="space-y-2">
//                   <Label htmlFor="medicalConditions" className="text-sm font-medium">
//                     Existing Medical Conditions
//                   </Label>
//                   <Textarea
//                     id="medicalConditions"
//                     placeholder="Please list any existing medical conditions, allergies, or medications you are currently taking (optional)"
//                     value={formData.medicalConditions}
//                     onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
//                     rows={4}
//                     className="resize-none"
//                   />
//                   <p className="text-sm text-gray-600">
//                     This information helps healthcare providers give you better care
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-6">
//                 <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => window.location.href = "/"}>
//                   Back to Login
//                 </Button>
//                 <Button
//                   type="submit"
//           className="bg-gradient-to-r from-[#007ac2] to-[#33c2a6] hover:from-[#0062a0] hover:to-[#2ea88f] px-6 py-2 text-white text-sm"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Saving Details..." : "Save & Continue"}
//                    </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { User, Calendar, Mail, Lock } from "lucide-react"

export default function PatientFormPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    gender: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateProgress = () => {
    const requiredFields = ["name", "email", "password", "birthday", "gender"]
    const filledFields = requiredFields.filter((field) => formData[field].trim() !== "")
    return (filledFields.length / requiredFields.length) * 100
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const requiredFields = {
      name: "Name",
      email: "Email",
      password: "Password",
      birthday: "Birthday",
      gender: "Gender",
    }

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field].trim()) {
        setError(`${label} is required`)
        return
      }
    }

    setIsLoading(true)

    localStorage.setItem("patientData", JSON.stringify(formData))
    setIsLoading(false)
    window.location.href = "/home"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="flex items-center justify-center space-x-3 mb-8">
        <img
          src="./src/assets/health rank logo.png"
          alt="Health Rank Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Registration</h1>
          <p className="text-gray-600 mt-2">Please provide your details to complete registration</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl">Basic Information</CardTitle>
            <CardDescription>Fill in your details to create your patient profile</CardDescription>
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
                      onChange={(e) => handleInputChange("name", e.target.value)}
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
                      onChange={(e) => handleInputChange("email", e.target.value)}
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
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
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
                      onChange={(e) => handleInputChange("birthday", e.target.value)}
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
                    onValueChange={(value) => handleInputChange("gender", value)}
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
                <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => window.location.href = "/"}>
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
  )
}
