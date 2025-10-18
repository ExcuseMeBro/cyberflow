import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef5ff',
          100: '#fce8ff',
          200: '#f9d5ff',
          300: '#f5b5ff',
          400: '#ef8bff',
          500: '#e556ff',
          600: '#d129ff',
          700: '#b10cdb',
          800: '#8f0ab3',
          900: '#6d0887',
        },
        secondary: {
          50: '#fff0f5',
          100: '#ffe0ec',
          200: '#ffc1d9',
          300: '#ff99c2',
          400: '#ff6ba8',
          500: '#ff3d8f',
          600: '#ff1a7d',
          700: '#e60069',
          800: '#b30052',
          900: '#80003b',
        },
        accent: {
          50: '#fff8f0',
          100: '#ffeed6',
          200: '#ffdead',
          300: '#ffca7a',
          400: '#ffb347',
          500: '#ff9d1f',
          600: '#ff8800',
          700: '#cc6d00',
          800: '#995200',
          900: '#663700',
        },
      },
      backgroundImage: {
        'gradient-passion': 'linear-gradient(135deg, #ff6ba8 0%, #e556ff 50%, #ff9d1f 100%)',
        'gradient-soft': 'linear-gradient(135deg, #fce8ff 0%, #fff0f5 50%, #fff8f0 100%)',
        'gradient-vibrant': 'linear-gradient(135deg, #ff3d8f 0%, #d129ff 50%, #ff8800 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#e556ff",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#ff3d8f",
            foreground: "#ffffff",
          },
          focus: "#ff6ba8",
        },
      },
    },
  })],
};

export default config;
