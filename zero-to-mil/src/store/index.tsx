import { createContext, useContext, useRef } from "react";
import { create, StoreApi, useStore } from "zustand";
import { Store } from "./store";

const appStore = create<Store>()((set) => ({
  count: 0,
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
