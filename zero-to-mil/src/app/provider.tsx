"use client";
import { Toaster } from "@/components/ui/sonner";
import { AppStoreProvider } from "@/store";
import { useLayoutStore } from "@/store/slices/layoutState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactElement } from "react";
import { useEffect } from "react";

const queryClient = new QueryClient();

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const { setWidth } = useLayoutStore();
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="top" />
      <AppStoreProvider>{children}</AppStoreProvider>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
