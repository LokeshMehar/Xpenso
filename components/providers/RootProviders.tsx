"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "../theme-provider";

function RootProviders({ children }: { children: ReactNode }) {
  return (
    
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
  );
}

export default RootProviders;
