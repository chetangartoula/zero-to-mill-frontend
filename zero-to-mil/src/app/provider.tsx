"use client";
import { AppStoreProvider } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactElement } from "react";

const queryClient = new QueryClient();

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="top" />
      <AppStoreProvider>{children}</AppStoreProvider>
    </QueryClientProvider>
  );
}
