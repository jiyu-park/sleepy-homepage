"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [state, setState] = useState({ status: "loading", data: null });

  const load = useCallback(async () => {
    setState({ status: "loading", data: null });
    try {
      const res = await fetch("/content/site.json", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setState({ status: "ready", data: await res.json() });
    } catch {
      setState({ status: "error", data: null });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ContentContext.Provider value={{ ...state, retry: load }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
