import React from "react";
import { NavLink } from "react-router-dom";
import { User, Shield, GraduationCap, UserCog, Stethoscope } from "lucide-react";

const SignupPage = () => {
  // Define roles with descriptions
  const roles = [
    {
      label: "Doctor",
      path: "/signup/doctor",
      icon: <Stethoscope className="w-8 h-8" />,
      description:
        "Manage and oversee all operations. Approve requests and ensure smooth management.",
    },
    {
      label: "Patient",
      path: "/signup/patient",
      icon: <User className="w-8 h-8" />,
      description:
        "Access guidance, submit reports, and view report analysis and announcements from doctors.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-r from-sky-100 to-blue-100">
      <div className="w-full max-w-5xl p-10 bg-white shadow-2xl rounded-2xl">
        {/* Title */}
        <h1 className="mb-8 text-4xl font-extrabold text-center text-sky-600 drop-shadow-md">
          Signup As
        </h1>

        {/* Role Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {roles.map((role) => (
            <NavLink key={role.label} to={role.path}>
              <div className="flex flex-col justify-between h-full p-6 space-y-4 text-white transition-transform transform shadow-lg cursor-pointer bg-gradient-to-r from-[#33c2a6] to-[#007ac2] hover:from-[#2ea88f] hover:to-[#0062a0] hover:scale-110 rounded-xl">
                <div className="flex flex-col items-center space-y-3">
                  {role.icon}
                  <h2 className="text-xl font-semibold">{role.label}</h2>
                </div>
                <p className="text-sm text-center text-blue-100">
                  {role.description}
                </p>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Info Text */}
        <p className="mt-10 text-base text-center text-gray-600">
          Select your role to navigate to the login page. After verifying your
          role, you'll be redirected automatically to your dashboard.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
