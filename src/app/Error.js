"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Route render error:", error);

    // If it's a stale-chunk error, a soft reset won't fix it — do a hard reload
    // to pull the fresh JS bundle instead of leaving the visitor stuck.
    const msg = error?.message || "";
    if (msg.includes("Loading chunk") || msg.includes("ChunkLoadError") || msg.includes("dynamically imported module")) {
      window.location.reload();
    }
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 15, opacity: 0.7 }}>Something went wrong loading this page.</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "8px 18px",
          borderRadius: 999,
          border: "none",
          background: "var(--primary)",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}