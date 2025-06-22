import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Stethoscope, Plus, FileText, Calendar, User, Phone, MapPin, LogOut, Bell, Settings } from "lucide-react"

export default function HomePage() {
  // Dummy patient data
  const [patientData] = useState({
    fullName: "John Doe",
    age: 32,
    gender: "Male",
    city: "New York",
    state: "NY",
    medicalConditions: "Hypertension, Asthma",
  })
  const [notifications] = useState(2)

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("patientData")
    localStorage.removeItem("userMobile")
    window.location.href = "/"
  }

  const recentActivities = [
    {
      id: 1,
      type: "report",
      title: "Blood Test Report Uploaded",
      description: "Complete Blood Count - Triage: Low Priority",
      date: "2024-01-20",
      status: "completed",
    },
    {
      id: 2,
      type: "appointment",
      title: "Upcoming Consultation",
      description: "Follow-up with Dr. Smith",
      date: "2024-01-25",
      status: "upcoming",
    },
  ]

  if (!patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">HealthTriage</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {patientData.fullName}! 👋</h2>
          <p className="text-gray-600">Manage your health reports and get instant triage assessments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-100 to-green-100 text-blue-700">
                      {patientData.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{patientData.fullName}</h3>
                    <p className="text-gray-600">
                      {patientData.age} years, {patientData.gender}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {patientData.city}, {patientData.state}
                    </span>
                  </div>
                </div>

                {patientData.medicalConditions && (
                  <div>
                    <h4 className="font-medium mb-2">Medical Conditions</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{patientData.medicalConditions}</p>
                  </div>
                )}

                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/patient-form"}>
                  <FileText className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <CardDescription>Upload reports and get instant health assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                    onClick={() => window.location.href = "/report-upload"}
                  >
                    <Plus className="h-6 w-6" />
                    Add Medical Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    View Past Reports
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Phone className="h-6 w-6" />
                    Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Health Summary */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Health Summary</CardTitle>
                <CardDescription>Your recent health activities and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">Overall Status</p>
                        <p className="text-2xl font-bold text-green-900">Good</p>
                      </div>
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800">Reports Uploaded</p>
                        <p className="text-2xl font-bold text-blue-900">3</p>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div>
                  <h4 className="font-medium mb-4">Recent Activities</h4>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          {activity.type === "appointment" && <Calendar className="h-4 w-4 text-blue-600" />}
                          {activity.type === "report" && <FileText className="h-4 w-4 text-green-600" />}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{activity.title}</h5>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                        </div>
                        <Badge variant={activity.status === "upcoming" ? "default" : "secondary"}>
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}