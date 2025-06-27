import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  Droplet,
  TestTube2,
  Thermometer,
  FlaskConical,
  ScanEye,
  Info,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router";

const getTriageBadgeColor = (level) => {
  switch (level?.toLowerCase()) {
    case "high-risk":
      return "bg-red-100 text-red-700";
    case "medium-risk":
      return "bg-yellow-100 text-yellow-700";
    case "low-risk":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const reportTypeStyles = {
  bloodSugar: {
    icon: <Droplet className="text-pink-600" />,
    color: "from-pink-100 to-pink-50 text-pink-800",
  },
  bloodCount: {
    icon: <TestTube2 className="text-red-600" />,
    color: "from-red-100 to-red-50 text-red-800",
  },
  serumCreatinine: {
    icon: <FlaskConical className="text-purple-600" />,
    color: "from-purple-100 to-purple-50 text-purple-800",
  },
  urine: {
    icon: <Thermometer className="text-yellow-600" />,
    color: "from-yellow-100 to-yellow-50 text-yellow-800",
  },
  electrolyte: {
    icon: <ScanEye className="text-blue-600" />,
    color: "from-blue-100 to-blue-50 text-blue-800",
  },
};

export default function ReportDisplayPage({ reports }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-10 px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        🧾 Your Medical Reports
      </h2>

      {Object.entries(reports).map(([type, reportList]) => {
        const style = reportTypeStyles[type] || {
          icon: <FileText className="text-gray-600" />,
          color: "from-gray-100 to-white text-gray-800",
        };

        return (
          <div key={type} className="mb-10">
            <div
              className={`rounded-xl px-6 py-4 mb-6 bg-gradient-to-r ${style.color} items-center gap-3 shadow-inner`}
            >
              <div className="text-2xl">{style.icon}</div>
              <h3 className="text-2xl font-semibold capitalize mb-3">
                {type.replace(/([A-Z])/g, " $1")}
              </h3>

              {!reportList || reportList.length === 0 ? (
                <p className="text-sm text-gray-500 italic pl-6">
                  No reports available for {type}.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reportList.map((report) => (
                    <Card
                      key={report._id}
                      className="hover:shadow-xl transition-shadow border border-gray-200"
                    >
                      <CardHeader className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Report Details
                        </CardTitle>
                        <Badge
                          className={getTriageBadgeColor(report.triageLevel)}
                        >
                          {report.triageLevel}
                        </Badge>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2 text-gray-700">
                        <p>
                          <strong>Date:</strong>{" "}
                          {format(new Date(report.date), "dd MMM yyyy")}
                        </p>
                        <p>
                          <strong>Remarks:</strong>{" "}
                          {report.result.actions || (
                            <span className="italic text-gray-400">None</span>
                          )}
                        </p>
                        <div className="flex">
                          <div className="pt-2">
                            <a
                              href={report.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-600 hover:underline"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              View File
                            </a>
                          </div>
                          <div className="pt-2 ml-7">
                            <a
                              onClick={() =>
                                navigate(`/${report._id}/triage-result`)
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-600 hover:underline"
                            >
                              <Info className="w-4 h-4 mr-1" />
                              View Details
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
