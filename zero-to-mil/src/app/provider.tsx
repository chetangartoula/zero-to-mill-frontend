"use client";
import { Toaster } from "@/components/ui/toaster";
import { AppStoreProvider } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

const queryClient = new QueryClient();

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  // const { setWidth } = useLayoutStore();
  // useEffect(() => {
  //   const handleResize = () => setWidth(window.innerWidth);
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [setWidth]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} position="top" /> */}
      <AppStoreProvider>{children}</AppStoreProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
