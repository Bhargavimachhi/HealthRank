import React from "react";
import { Outlet } from "react-router-dom";
import { DoctorNavBar } from "@/Doctor/pages/DoctorNavBar";

const DoctorLayout = () => {
  return (
      <div>
        <DoctorNavBar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
  );
};

export default DoctorLayout;