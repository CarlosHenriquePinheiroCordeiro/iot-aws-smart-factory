import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const ConfirmAuth: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { email, password } = (location.state as { email?: string; password?: string }) || {};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const response = await api.patch("http://localhost:3001/confirm", {
        email,
        code,
      });
      
      if (response.data.statusCode === 200) {
        const responseLogin = await api.post("http://localhost:3001/login", {
          email,
          password
        });
        login(responseLogin.data.accessToken, responseLogin.data.refreshToken);
        setIsLoading(false);
        navigate("/home");
      }
      
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response.data.message);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Confirming..."/>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>
        Enter the 6-digit code sent to {email} below
      </h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded shadow-md">
        <input
          type="number"
          placeholder="Verification code"
          className="border p-2 mb-2 w-full"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ConfirmAuth;
