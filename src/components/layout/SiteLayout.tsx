import { useEffect } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ThemeProvider } from "./ThemeProvider";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
