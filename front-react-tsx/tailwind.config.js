/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        brandPrimary: '#1B71B1',
        brandAccent: '#FFA500',
        safetyYellow: '#FFC400',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#1B71B1',
          secondary: '#FFA500',
          accent: '#FFC400',
          neutral: '#F3F4F6',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
      {
        dark: {
          primary: '#1B71B1',
          secondary: '#FFA500',
          accent: '#FFC400',
          neutral: '#1C1C1E',
          'base-100': '#1C1C1E',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
    darkTheme: 'dark',
  },
};
