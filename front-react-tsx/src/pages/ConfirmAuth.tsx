import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { useLoading } from "../context/LoadingContext";
import { FaCheck } from "react-icons/fa";
import ThemeSwitch from "../components/ThemeSwitch";
import NanoLoadingAnimation from "../components/animations/NanoLoadingAnimation";

const ConfirmAuth: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setGlobalLoading, setLoadingComponent } = useLoading();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { email, password } = (location.state as { email?: string; password?: string }) || {};

  const isValid = /^\d{6}$/.test(code);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoadingComponent(<NanoLoadingAnimation textLoading="Confirming"/>);
      setGlobalLoading(true);
      const response = await api.patch("http://localhost:3001/confirm", {
        email,
        code,
      });
      if (response.data.statusCode === 200) {
        const responseLogin = await api.post("http://localhost:3001/login", {
          email,
          password,
        });
        login(responseLogin.data.accessToken, responseLogin.data.refreshToken);
        setGlobalLoading(false);
        navigate("/home");
      }
    } catch (err: any) {
      setGlobalLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 py-10">
      <div className="absolute top-0 right-0 p-4">
        <ThemeSwitch />
      </div>
      <div className="max-w-md w-full p-6 bg-base-200 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center text-primary mb-4">
          Enter the 6-digit code sent to {email}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              maxLength={6}
              placeholder="Verification code"
              className="input input-bordered w-full"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className={`flex items-center justify-center py-2 px-6 rounded transition-all duration-300 ease-out ${
                isValid
                  ? "bg-secondary text-black transform scale-100 animate-pulse"
                  : "bg-gray-400 cursor-not-allowed transform scale-95"
              }`}
            >
              <FaCheck className="mr-2" />
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmAuth;
