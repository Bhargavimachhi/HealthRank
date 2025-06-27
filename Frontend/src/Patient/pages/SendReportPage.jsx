// src/Patient/pages/SendReportPage.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SendReportPage() {
  const { reportId } = useParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/doctors/search?query=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to search doctors.");
    } finally {
      setLoading(false);
    }
  };

  const sendReport = async (doctorId) => {
    try {
      await axios.post(`http://localhost:5000/reports/send`, {
        reportId,
        doctorId,
      });
      toast.success("Report sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send report.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Send Report to Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Search doctor or hospital..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={searchDoctors} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {results.map((doctor) => (
              <Card key={doctor._id}>
                <CardHeader>
                  <CardTitle>{doctor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {doctor.hospital}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => sendReport(doctor._id)}>
                    Send Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
