import React from "react";
import { Outlet } from "react-router-dom";
import { PatientNavBar } from "@/Patient/pages/PatientNavBar";

const PatientLayout = () => {
  return (
      <div>
        <PatientNavBar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
  );
};

export default PatientLayout;