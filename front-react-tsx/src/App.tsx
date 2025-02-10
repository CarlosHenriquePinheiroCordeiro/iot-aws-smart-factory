// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ConfirmAuth from "./pages/ConfirmAuth";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";

const AppContent: React.FC = () => {
  const { isGlobalLoading, loadingMessage } = useLoading();

  return (
    <>
      {isGlobalLoading && <LoadingOverlay message={loadingMessage} />}
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmAuth" element={<ConfirmAuth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
