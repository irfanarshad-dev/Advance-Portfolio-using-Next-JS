"use client";
import { useTheme } from "@/context/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// Theme Toggle Button Component
export default function ClientThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="group flex items-center justify-center p-2 rounded-full transition-colors duration-300 cursor-pointer"
      style={{ backgroundColor: 'var(--card-bg-secondary)' }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? 
        <LightModeIcon className="text-[var(--foreground)] group-hover:text-[var(--primary)]" /> : 
        <DarkModeIcon className="text-[var(--foreground)] group-hover:text-[var(--primary)]" />
      }
    </button>
  );
}