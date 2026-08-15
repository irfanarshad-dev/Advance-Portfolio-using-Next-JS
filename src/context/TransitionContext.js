"use client";
import { createContext, useContext, useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

const TransitionContext = createContext({ navigate: (href) => {} });

export function TransitionProvider({ children }) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [, startTransition] = useTransition();

  const navigate = useCallback((href) => {
    setLeaving(true);
    setTimeout(() => {
      startTransition(() => router.push(href));
      setLeaving(false);
    }, 350);
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigate, leaving }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransitionNav = () => useContext(TransitionContext);
