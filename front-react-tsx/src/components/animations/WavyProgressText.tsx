import React, { useState, useEffect } from "react";

interface WavyProgressTextProps {
  text: string;
}

const WavyProgressText: React.FC<WavyProgressTextProps> = ({ text }) => {
  // Number of trailing dots that cycle from 0..3
  const [dots, setDots] = useState(0);

  // Split the user-provided text into individual characters (including spaces)
  const letters = text.split("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-primary text-xl inline-flex items-center whitespace-pre">
      <b>
        {letters.map((char, i) => (
          <span
            key={i}
            className="inline-block animate-waveStop"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {char}
          </span>
        ))}

        {[...Array(dots)].map((_, i) => {
          const delayIndex = letters.length + i;
          return (
            <span
              key={`dot-${i}`}
              className="inline-block animate-waveStop"
              style={{ animationDelay: `${delayIndex * 0.1}s` }}
            >
              .
            </span>
          );
        })}
      </b>
    </div>
  );
};

export default WavyProgressText;
