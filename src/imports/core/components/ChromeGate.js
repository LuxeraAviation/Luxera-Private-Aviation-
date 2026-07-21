"use client";

import { createContext, useContext, useState } from "react";

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
