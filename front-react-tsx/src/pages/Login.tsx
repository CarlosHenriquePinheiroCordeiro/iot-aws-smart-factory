import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { useLoading } from "../context/LoadingContext";
import ThemeSwitch from "../components/ThemeSwitch";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaUserPlus } from "react-icons/fa";
import Lottie from "lottie-react";
import lightAnimationData from "../lottie/lightRobotLogin.json";
import darkAnimationData from "../lottie/darkRobotLogin.json";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import NanoLoadingAnimation from "../components/animations/NanoLoadingAnimation";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setGlobalLoading, setLoadingComponent } = useLoading();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoadingComponent(<NanoLoadingAnimation textLoading="Logging in"/>);
      setGlobalLoading(true);

      api.post("/login", { email, password })
        .then(response => {
          login(response.data.accessToken, response.data.refreshToken);
          setGlobalLoading(false);
          navigate("/home");
        })
        .catch(err => {
          if (err.status === 409) {
            navigate("/confirmAuth", { state: { email, password } });
          } else {
            setError(err.response.data.message);
          }
        })
        .finally(() => setGlobalLoading(false));
    } catch (err: any) {
      setError(err);
      setGlobalLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen ${theme === 'light' ? 'bg-base-100' : ''}`} style={theme === 'dark' ? {backgroundColor: '#040404'} : {}}>
      <div className="absolute top-0 right-0 p-4">
        <ThemeSwitch />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen max-w-5xl mx-auto gap-72">
        <div className="w-full md:w-1/2 flex items-center justify-center p-2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {theme === "light" && (
              <Lottie
                animationData={lightAnimationData}
                loop
                style={{ width: "700px", height: "700px" }}
              />
            )}
            {theme === "dark" && (
              <Lottie
                animationData={darkAnimationData}
                loop
                style={{ width: "700px", height: "700px" }}
              />
            )}
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-2">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-5">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-primary">
                  Smart Factory
                </h1>
                <br />
                <hr />
              </div>
              <form onSubmit={handleSubmit} className="card-body space-y-4">
                <div className="form-control relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered pl-10 placeholder-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaEnvelope />
                  </span>
                </div>

                <div className="form-control relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered pl-10 pr-10 placeholder-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaLock />
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {error && (
                  <p className="text-error text-sm mt-2">{error}</p>
                )}

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    <FaArrowRight size={'20px'} /> <b>Login</b>
                  </button>
                </div>
                <div className="form-control mt-6">
                  <button type="button" onClick={() => navigate('/register')} className="btn btn-secondary">
                    <FaUserPlus size={'20px'}/> <b>Sign Up</b>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
