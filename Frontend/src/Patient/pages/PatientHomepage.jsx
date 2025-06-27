import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Stethoscope,
  Plus,
  FileText,
  Calendar,
  User,
  Phone,
  MapPin,
  LogOut,
  Bell,
  Settings,
} from "lucide-react";
import { useUserContext } from "../../../context/userContext";
import { useNavigate } from "react-router";

export default function PatientHomePage() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("healthAuth"))
  );
  const navigate = useNavigate();

  function countAgeFromBirthday(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred yet this year
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  function getReportSummary(reports) {
    let totalReports = 0;
    const reportTypeCounts = {};

    for (const [type, reportList] of Object.entries(reports)) {
      const count = Array.isArray(reportList) ? reportList.length : 0;
      reportTypeCounts[type] = count;
      totalReports += count;
    }

    return totalReports;
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
  ];

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.name}! 👋
          </h2>
          <p className="text-gray-600">
            Manage your health reports and get instant triage assessments
          </p>
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
                      {userData?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{userData.name}</h3>
                    <p className="text-gray-600">
                      {userData?.email}
                    </p>
                    <p className="text-gray-600">
                      DOB : {userData?.birthday?.split("T")[0]}
                    </p>
                    <p className="text-gray-600">
                      {countAgeFromBirthday(userData.birthday)} years
                    </p>
                    <p className="text-gray-600">
                      {userData?.gender}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <CardDescription>
                  Upload reports and get instant health assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    className="h-20 bg-gradient-to-r from-[#007ac2] to-[#33c2a6] hover:from-[#0062a0] hover:to-[#2ea88f] px-6 py-2 text-white text-sm"
                    onClick={() =>
                      navigate(`/patient/${userData._id}/report-upload`)
                    }
                  >
                    <Plus className="h-6 w-6" />
                    Add Medical Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate(`/patient/${userData._id}/past-reports`)}>
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
                <CardDescription>
                  Your recent health activities and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          Reports Uploaded
                        </p>
                        <p className="text-2xl font-bold text-blue-900">{getReportSummary(userData.reports)}</p>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
