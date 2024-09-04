"use client";
import BottomBar from "@/components/navigation/BottomBar";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { useAppStore } from "@/store";
import getAccessToken from "@/store/actions/getAccessToken";
import React, { PropsWithChildren, useEffect } from "react";

function ProtectedLayout({ children }: PropsWithChildren) {
  const { accessToken, setAccessToken } = useAppStore((state) => state);
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await getAccessToken();
        setAccessToken(response);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };
    if (!accessToken) fetchAccessToken();
  }, [accessToken, setAccessToken]);

  return (
    <div>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <BottomBar />
      </div>
    </div>
  );
}

export default ProtectedLayout;
