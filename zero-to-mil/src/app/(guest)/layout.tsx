"use client";

import React, { PropsWithChildren, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthProps extends PropsWithChildren {}

function AuthLayout({ children }: AuthProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 bg-accent hover:bg-accent/80 text-foreground"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}

      <div className="md:hidden w-full flex flex-col relative top-20 min-h-[calc(100vh-5rem)]">
        {children}
      </div>
      <div className="hidden md:flex w-full h-screen fixed items-center justify-center">
        <div className="w-1/3 bg-menu h-auto p-4 rounded-xl">{children}</div>
      </div>
    </>
  );
}

export default AuthLayout;
