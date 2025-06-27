//HealthRank\Frontend\src\Doctor\pages\DashBoardPage.jsx
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Clock, FileText, CheckCircle, XCircle, LogOut, Bell } from "lucide-react"
import { PatientDetailModal } from "@/components/PatientModal"
import { useUserContext } from "../../../context/userContext"


const mockIncomingRequests = [
  {
    id: "1",
    patientName: "Alice Johnson",
    age: 28,
    gender: "Female",
    note: "Fever and sore throat for 3 days.",
    timeAgo: "2h ago",
    status: "pending",
    reportTypes: ["CBC", "Blood Sugar"],
    attachedFiles: [
      { name: "cbc_report_alice.pdf" },
      { name: "blood_sugar_alice.pdf" }
    ],
    aiTriage: {
      level: "Medium",
      suggestedActions: "Schedule appointment within 24-48 hours.",
      explanation: "Moderate symptoms, not urgent but needs evaluation."
    }
  },
  {
    id: "2",
    patientName: "Bob Smith",
    age: 45,
    gender: "Male",
    note: "Chest pain and shortness of breath.",
    timeAgo: "10m ago",
    status: "pending",
    reportTypes: ["ECG"],
    attachedFiles: [
      { name: "ecg_bob.pdf" }
    ],
      aiTriage: {
      level: "High",
      suggestedActions: "Immediate ER referral.",
      explanation: "Symptoms suggest possible cardiac event."
    }
  }
]

const mockAcceptedRequests = [
  {
    id: "3",
    patientName: "Carol Lee",
    age: 36,
    gender: "Female",
    note: "Routine checkup, mild headache.",
    timeAgo: "1d ago",
    status: "ongoing",
    reportTypes: ["CBC"],
    attachedFiles: [
      { name: "cbc_carol.pdf" }
    ],
    aiTriage: {
      level: "Low",
      suggestedActions: "Monitor at home, follow up if worsens.",
      explanation: "Mild symptoms, no urgent findings."
    },
    remarks: "",
  },
    {
    id: "4",
    patientName: "David Kim",
    age: 52,
    gender: "Male",
    note: "Diabetes follow-up.",
    timeAgo: "3d ago",
    status: "completed",
    reportTypes: ["Blood Sugar", "HbA1c"],
    attachedFiles: [
      { name: "blood_sugar_david.pdf" },
      { name: "hba1c_david.pdf" }
    ],
    aiTriage: {
      level: "Medium",
      suggestedActions: "Adjust medication, dietary advice.",
      explanation: "Blood sugar slightly elevated."
    },
    remarks: "Advised to increase physical activity and monitor sugar levels.",
  }
]


export default function DashboardPage() {
  const {userData} = useUserContext();
  const [doctorName, setDoctorName] = useState("Doctor")
  const [incomingRequests, setIncomingRequests] = useState(mockIncomingRequests)
  const [acceptedRequests, setAcceptedRequests] = useState(mockAcceptedRequests)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [activeTab, setActiveTab] = useState("incoming")

  useEffect(() => {
    setDoctorName("Doctor")
  }, [])

  const handleAcceptRequest = (requestId) => {
    const request = incomingRequests.find((r) => r.id === requestId)
    if (request) {
      setIncomingRequests((prev) => prev.filter((r) => r.id !== requestId))
      setAcceptedRequests((prev) => [...prev, { ...request, status: "pending" }])
    }
  }

  const handleDeclineRequest = (requestId) => {
    setIncomingRequests((prev) => prev.filter((r) => r.id !== requestId))
  }

  const handleStatusUpdate = (requestId, newStatus) => {
    setAcceptedRequests((prev) =>
      prev.map((request) => (request.id === requestId ? { ...request, status: newStatus } : request))
    )
  }

  const handleRemarksUpdate = (requestId, remarks) => {
    setAcceptedRequests((prev) =>
      prev.map((request) => (request.id === requestId ? { ...request, remarks } : request))
    )
  }

  

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTriageColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="incoming">Incoming Requests ({incomingRequests.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Requests ({acceptedRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {incomingRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{request.patientName}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {request.timeAgo}
                      </div>
                    </div>
                    <CardDescription>
                      {request.age} years old • {request.gender}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Chief Complaint:</p>
                      <p className="text-sm">{request.note}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleAcceptRequest(request.id)} className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeclineRequest(request.id)}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {incomingRequests.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No incoming requests</h3>
                <p className="text-gray-500">New patient requests will appear here.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {acceptedRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{request.patientName}</CardTitle>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>
                      {request.age} years old • {request.gender}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Reports:</p>
                      <div className="flex flex-wrap gap-1">
                        {request.reportTypes?.map((type, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {request.aiTriage && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">AI Triage:</p>
                        <Badge className={getTriageColor(request.aiTriage.level)}>
                          {request.aiTriage.level} Priority
                        </Badge>
                      </div>
                    )}

                    <Button size="sm" variant="outline" className="w-full" onClick={() => setSelectedPatient(request)}>
                         <User className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {acceptedRequests.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No accepted requests</h3>
                <p className="text-gray-500">Accepted patient requests will appear here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onStatusUpdate={handleStatusUpdate}
          onRemarksUpdate={handleRemarksUpdate}
        />
      )}
    </div>

  )
}