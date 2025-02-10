import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { useLoading } from "../context/LoadingContext";
import ThemeSwitch from "../components/ThemeSwitch";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setGlobalLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setGlobalLoading(true, 'Logging in...');
      const response = await api.post("/login", { email, password });
      
      login(response.data.accessToken, response.data.refreshToken);
      setGlobalLoading(false);
      
      navigate("/home");
    } catch (err: any) {
      setGlobalLoading(false);
      if (err.status === 409) {
        navigate("/confirmAuth", {
          state: { email, password },
        });
      } else {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">Smart Factory</h1>
          <p className="py-6 text-base-content">
            Enter your credentials below!
          </p>
          <ThemeSwitch />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-error text-sm mt-2">{error}</p>
            )}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
