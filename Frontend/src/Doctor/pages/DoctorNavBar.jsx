import { Button } from "@/components/ui/button";
import { useUserContext } from "../../../context/userContext";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export const DoctorNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("healthRankAuth", null);
    localStorage.setItem("healthAuth", null);
    navigate("/");
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
