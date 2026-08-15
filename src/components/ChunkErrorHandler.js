"use client";
import { useEffect } from "react";

// After every new deployment, Next.js renames JS chunk files. If someone has
// the site open in their browser from before the deploy and then navigates
// client-side (via <Link>) to a page whose chunk changed, the browser tries
// to fetch a chunk file that no longer exists on the server. That fetch
// fails silently, React can't render the new route, and the screen goes
// blank — until the person manually refreshes and gets the fresh HTML/JS.
//
// This listens for that specific failure and reloads the page automatically
// so visitors never see the blank screen or need to know to refresh.
export default function ChunkErrorHandler() {
  useEffect(() => {
    const isChunkError = (message = "") => {
      const msg = String(message);
      return (
        msg.includes("Loading chunk") ||
        msg.includes("ChunkLoadError") ||
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("error loading dynamically imported module")
      );
    };

    const handleError = (event) => {
      if (isChunkError(event?.message)) {
        window.location.reload();
      }
    };

    const handleRejection = (event) => {
      const reason = event?.reason?.message || event?.reason || "";
      if (isChunkError(reason)) {
        window.location.reload();
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}