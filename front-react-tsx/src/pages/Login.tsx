import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const response = await api.post("/login", {
        email,
        password,
      });
      
      login(response.data.accessToken, response.data.refreshToken);
      setIsLoading(false);
      
      navigate("/home");
    } catch (err: any) {
      setIsLoading(false);
      if (err.status === 409) {
        navigate(
          "/confirmAuth",
          {
            state: {
              "email": email,
              "password": password
            }
          }
        );
      } else {
        setError(err.response.data.message);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Logging in..."/>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded shadow-md">
        <h1 className="text-xl mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
