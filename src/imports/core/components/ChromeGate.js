"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ChromeContext = createContext({ hidden: false, setHidden: () => { } });

export function ChromeProvider({ children }) {
  const [hidden, setHidden] = useState(false);
  return (
    <ChromeContext.Provider value={{ hidden, setHidden }}>
      {children}
    </ChromeContext.Provider>
  );
}

export function Chrome({ children }) {
  const { hidden } = useContext(ChromeContext);
  return hidden ? null : <>{children}</>;
}

export function useHideChrome() {
  const { setHidden } = useContext(ChromeContext);
  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);
}
