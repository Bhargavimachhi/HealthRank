import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAlert = () => {
  const navigate = useNavigate();

  const handleAlert = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          🔒 Please log in to access the portal
        </h1>
        <p className="text-gray-600 mb-6">
          Your journey starts with a secure sign-in.
        </p>
        <button
          onClick={handleAlert}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg"
        >
          🚀 Login Here
        </button>
      </div>
    </div>
  );
};

export default LoginAlert;
