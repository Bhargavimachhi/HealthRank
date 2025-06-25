import React from 'react';
import { useNavigate } from "react-router-dom";

const LoginAlert = () => {
    const navigate = useNavigate();

    const handleAlert = () => {
        navigate("/login");
    };

    return (
        <div>
        <h1>To access the portal you need to login</h1>

        <button className="alert-button" onClick={handleAlert}>
            Login Here
        </button>
        </div>
    );
};

export default LoginAlert;
