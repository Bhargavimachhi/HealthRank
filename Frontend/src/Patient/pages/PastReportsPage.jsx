import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ReportDisplayPage from "./ReportDisplayPage";

export default function PastReportsPage() {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/patient/${patientId}/past-reports`
        );
        setReports(res.data.reports || []);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [patientId]);

  const getTriageVisuals = (level) => {
    if (!level)
      return {
        color: "gray",
        icon: <Clock className="h-4 w-4" />,
        label: "Unknown",
      };
    if (level.toLowerCase().includes("high"))
      return {
        color: "red",
        icon: <AlertTriangle className="h-4 w-4" />,
        label: "High Risk",
      };
    if (level.toLowerCase().includes("medium"))
      return {
        color: "yellow",
        icon: <Clock className="h-4 w-4" />,
        label: "Medium Risk",
      };
    return {
      color: "green",
      icon: <CheckCircle className="h-4 w-4" />,
      label: "Low Risk",
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading past reports...</p>
        </div>
      </div>
    );
  }

  return (
    <>

      {!reports ? (
        <div className="text-center text-gray-500">No past reports found.</div>
      ) : (
        <ReportDisplayPage reports={reports} />
      )}
    </>
  );
}
