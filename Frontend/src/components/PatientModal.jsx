import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, FileText, Brain, Save, Download, Eye } from "lucide-react"

export function PatientDetailModal({
  patient,
  isOpen,
  onClose,
  onStatusUpdate,
  onRemarksUpdate,
}) {
  const [currentStatus, setCurrentStatus] = useState(patient.status)
  const [remarks, setRemarks] = useState(patient.remarks || "")
  const [showRemarks, setShowRemarks] = useState(patient.status === "completed")

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus)
    setShowRemarks(newStatus === "completed")
    onStatusUpdate(patient.id, newStatus)
  }

  const handleSaveRemarks = () => {
    onRemarksUpdate(patient.id, remarks)
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Details - {patient.patientName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-sm">{patient.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Age</p>
                  <p className="text-sm">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Gender</p>
                  <p className="text-sm">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <Badge className={getStatusColor(currentStatus)}>
                    {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Chief Complaint</p>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{patient.note}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Update Status</p>
                <Select value={currentStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports and AI Triage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Reports & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Uploaded Reports</p>
                <div className="flex flex-wrap gap-2">
                  {patient.reportTypes?.map((type, index) => (
                    <Badge key={index} variant="secondary">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {patient.attachedFiles && patient.attachedFiles.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Attached Files</p>
                  <div className="space-y-2">
                    {patient.attachedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <span className="text-sm">{file.name}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {patient.aiTriage && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    AI Triage Analysis
                  </p>
                  <div className="bg-blue-50 p-4 rounded-md space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Priority Level:</span>
                      <Badge className={getTriageColor(patient.aiTriage.level)}>{patient.aiTriage.level}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Suggested Actions:</p>
                      <p className="text-sm text-gray-700">{patient.aiTriage.suggestedActions}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Explanation:</p>
                      <p className="text-sm text-gray-700">{patient.aiTriage.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Case Remarks */}
        {showRemarks && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Case Remarks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your final remarks and recommendations for this case..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
              />
              <Button onClick={handleSaveRemarks} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Remarks
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Existing Remarks Display */}
        {patient.remarks && !showRemarks && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Previous Remarks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm bg-gray-50 p-3 rounded-md">{patient.remarks}</p>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}