import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaLightbulb } from "react-icons/fa";

const ThemeSwitch: React.FC = () => {
  const [theme, setActualTheme] = useState<'light' | 'dark'>('dark');
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme)
  });

  const toggleTheme = () => {
    setActualTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <label style={{fontSize: '40px'}} className="swap swap-rotate cursor-pointer">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === 'dark'}
        className="hidden"
      />
      <FaLightbulb className='swap-on' />
      <FaLightbulb className='swap-off' />
    </label>
  );
};

export default ThemeSwitch;
