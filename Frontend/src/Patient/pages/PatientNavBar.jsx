import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings, Badge } from "lucide-react";
import { useState } from "react";

export const PatientNavBar = () => {
  const [notifications] = useState(2);

  const handleLogout = () => {
    window.location.href = "/";
  };
  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-1">
                <img
                  src="/src/assets/health rank logo.png"
                  alt="Health Rank Logo"
                  className="h-10 w-auto object-contain"
                />
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
    </>
  );
};
