import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ConfirmAuth from "./pages/ConfirmAuth";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingOverlay from "./components/LoadingOverlay";
import { LeftToRightTransition } from "./transitions/LeftToRightTransition";
import { TopToBottomTransition } from "./transitions/TopToBottomTransition";

const AppContent: React.FC = () => {
  const { isGlobalLoading, loadingComponent } = useLoading();

  return (
    <>
      {isGlobalLoading && <LoadingOverlay loadingComponent={loadingComponent} />}
      <Router>
        <Routes>

          <Route path="/register" element={
              <LeftToRightTransition>
                <Register />
              </LeftToRightTransition>
            }
          />
          
          <Route path="/login" element={<Login />}/>
          <Route path="/confirmAuth" element={
              <LeftToRightTransition>
                <ConfirmAuth />
              </LeftToRightTransition>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <TopToBottomTransition>
                  <Home />
                </TopToBottomTransition>
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
      <ThemeProvider>
        <LoadingProvider>
          <AppContent />
        </LoadingProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
