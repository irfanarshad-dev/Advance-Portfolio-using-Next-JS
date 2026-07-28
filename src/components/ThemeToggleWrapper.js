"use client";
import { usePathname } from "next/navigation";
import ClientThemeToggle from "@/components/ClientThemeToggle";

export default function ThemeToggleWrapper() {
  const pathname = usePathname();
  return (
    <div className="fixed top-4 right-4 z-50">
      <ClientThemeToggle />
    </div>
  );
}
