"use client";
import { createContext, useContext, useRef } from "react";
import { create, StoreApi, useStore } from "zustand";
import { Store } from "./store";
import { createAuthStore } from "./slices/accessToken";
import { createLoginStore } from "./slices/login";

const appStore = create<Store>()((...set) => ({
  ...createLoginStore(...set),
  ...createAuthStore(...set),
}));

export const AppStoreContext = createContext<StoreApi<Store>>(null!);

export function AppStoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<StoreApi<Store>>();
  if (!storeRef.current) {
    storeRef.current = appStore;
  }
  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
}

export const useAppStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(AppStoreContext);
  if (!storeContext) {
    throw new Error("useAppStore must be used within a AppStoreProvider");
  }
  return useStore(storeContext, selector);
};
