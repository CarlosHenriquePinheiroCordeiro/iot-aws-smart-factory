import React from "react";

type LoadingSpinnerProps = {
  size?: number;
  color?: string;
  message?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 120, color = "#000000", message }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `${size / 10}px solid transparent`,
    borderTop: `${size / 10}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 500ms linear infinite",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={spinnerStyle}></div>
      {message && <p style={{ marginTop: "10px", color }}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
