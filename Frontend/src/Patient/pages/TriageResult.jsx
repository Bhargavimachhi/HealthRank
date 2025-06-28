// Here's a visually enhanced version of your TriageResultPage UI
// with cleaner design, polished dropdowns, transitions, layout balance,
// and modernized visual hierarchy.

import React, { useState, useEffect } from "react";
// UI Components - Button & Card
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// UI Components - Alert
import { Alert, AlertDescription } from "@/components/ui/alert";

// UI Components - Separator
import { Separator } from "@/components/ui/separator";

// UI Components - DropdownMenu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Calendar,
  FileText,
  Home,
  Plus,
  Activity,
  Loader2,
  Mic,
  Mic2,
  Speaker,
  SpeakerIcon,
  SpeechIcon,
} from "lucide-react";
import { useParams } from "react-router";
import axios from "axios";
import { useUserContext } from "../../../context/userContext";

function Label({ className, children, ...props }) {
  return (
    <label
      className={`text-sm font-medium text-muted-foreground ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  );
}

export default function TriageResultPage() {
  const { reportId } = useParams();
  const { userData } = useUserContext();
  const [triageResult, setTriageResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [times, setTimes] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/patient/report/${reportId}`
        );
        setTasks(res.data.result.tasks);
        setTimes(res.data.result.times);
        setTriageResult(res.data);
      } catch (err) {
        setTriageResult(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [reportId]);

  const translate = async (lang) => {
    if (!triageResult) return;
    setIsTranslating(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/translate${lang === "Hindi" ? "/Hindi" : ""}`,
        {
          triage_level: triageResult.result.Triage_level,
          reason: triageResult.result.Reason,
          actions: triageResult.result.actions,
          type: triageResult.type,
        }
      );
      setTriageResult({
        ...triageResult,
        result: {
          ...triageResult.result,
          Triage_level_original: triageResult.result.Triage_level,
          Triage_level: response.data.triage_level,
          Reason: response.data.reason,
          actions: response.data.actions,
        },
        type: response.data.type,
      });
      setTranslated(true);
    } catch {
      alert("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const getTriageVisuals = (level) => {
    if (!level)
      return {
        color: "bg-gray-400",
        icon: <Clock className="h-6 w-6 text-white" />,
        label: "Unknown",
      };
    const lower = level.toLowerCase();
    if (lower.includes("high"))
      return {
        color: "bg-red-500",
        icon: <AlertTriangle className="h-6 w-6 text-white" />,
        label: "High Priority",
      };
    if (lower.includes("medium"))
      return {
        color: "bg-yellow-500",
        icon: <Clock className="h-6 w-6 text-white" />,
        label: "Medium Priority",
      };
    return {
      color: "bg-green-500",
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      label: "Low Priority",
    };
  };

  if (isLoading || !triageResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold">Analyzing Your Report...</h2>
          <p className="text-sm text-muted-foreground">
            Please wait while our AI reviews your data.
          </p>
        </div>
      </div>
    );
  }

  const { result, triageLevel, file, type, date } = triageResult;
  const visuals = getTriageVisuals(
    result?.Triage_level_original || result?.Triage_level
  );

  const handleSpeak = (text) => {
    const value = new SpeechSynthesisUtterance(text);
    value.lang = "hi-IN";
    window.speechSynthesis.speak(value);
  };

  const handleSpeakArray = (array) => {
    for (let text of array) {
      handleSpeak(text);
    }
  };

  const acceptOffer = (index) => {
    const days = times[index];
    if (!tasks[index] || isNaN(days) || days <= 0) return;
    const newTask = {
      id: Date.now(),
      name: tasks[index],
      days,
      createdAt: new Date().toISOString().split("T")[0],
      completions: [],
    };
    let a = tasks.splice(0, index);
    let b = tasks.splice(index);
    setTasks([...a, ...b]);
    let data = JSON.parse(localStorage.getItem("tasks"));
    localStorage.setItem("tasks", JSON.stringify([...data, newTask]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full shadow-md">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Triage Assessment Complete</h1>
          <p className="text-muted-foreground">
            Based on your uploaded report and symptom analysis
          </p>

          <Button
            variant="outline"
            className="m-4"
            onClick={() =>
              handleSpeak("Your Current Report is on " + triageLevel)
            }
          >
            <Mic />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mt-4">
                {isTranslating ? "Translating..." : "Translate"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Translate To</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isTranslating || translated}
                onClick={() => translate("Gujarati")}
              >
                Gujarati
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isTranslating || translated}
                onClick={() => translate("Hindi")}
              >
                Hindi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between">
                    Triage Assessment
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleSpeak("Your Report is on" + triageLevel)
                      }
                    >
                      <Mic />
                    </Button>
                  </div>{" "}
                </CardTitle>
                <CardDescription>
                  AI-powered health risk evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${visuals.color} text-white shadow-md`}
                  >
                    {visuals.icon}
                    <span className="text-lg font-semibold">
                      {visuals.label}
                    </span>
                  </div>
                  <p className="capitalize text-lg font-medium mt-2">
                    {result?.Triage_level?.replace("-", " ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {triageLevel === "critical"
                      ? "Immediate medical attention recommended"
                      : triageLevel === "warning"
                      ? "Consult a doctor soon"
                      : "Routine care or self-management"}
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-blue-600" /> Reasons
                    </h3>
                    <Button
                      variant="outline"
                      className="m-4"
                      onClick={() => handleSpeakArray(result?.Reason)}
                    >
                      <Mic />
                    </Button>
                  </div>

                  <ul className="space-y-2 pl-2">
                    {(result?.Reason || []).map((r, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-700 list-disc list-inside"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />

                <div>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />{" "}
                      Recommended Actions
                    </h3>
                    <Button
                      variant="outline"
                      className="m-4"
                      onClick={() =>
                        handleSpeak(result?.actions)
                      }
                    >
                      <Mic />
                    </Button>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    {result?.actions}
                  </p>
                </div>
                <Separator />
                <div className="p-4 bg-white rounded-2xl shadow-sm border">
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Tasks
                  </h3>
                  <ul className="space-y-3">
                    {tasks?.map((task, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between bg-gray-50 p-3 rounded-xl border hover:shadow transition"
                      >
                        <div className="text-sm text-gray-800">
                          <span className="font-medium">{task}</span> for{" "}
                          <span className="text-gray-600">{times[i]}</span>
                        </div>
                        <Button
                          variant="default"
                          onClick={() => acceptOffer(i)}
                          className="text-sm bg-green-500 hover:bg-green-600"
                        >
                          Accept Task
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                {triageLevel === "critical" && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      This indicates a critical condition. Please visit the
                      nearest emergency center immediately.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  className="h-16 flex-col gap-1"
                  onClick={() => (window.location.href = "/patient")}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex-col gap-1"
                  onClick={() =>
                    (window.location.href = `/patient/${userData._id}/report-upload`)
                  }
                >
                  <Plus className="h-5 w-5" />
                  Upload New Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <FileText className="h-5 w-5 text-blue-600" /> Report Summary
                  <Button
                    variant="outline"
                    className="m-4"
                    onClick={() => handleSpeak("Report Type is" + type)}
                  >
                    <Mic />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Report Type</Label>
                  <p className="capitalize font-medium text-gray-800">{type}</p>
                </div>
                <div>
                  <Label>File</Label> <br />
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Report
                  </a>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="text-gray-800">
                    {new Date(date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs text-muted-foreground">
                    This assessment is not a diagnosis. Always consult licensed
                    medical professionals for health decisions.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
