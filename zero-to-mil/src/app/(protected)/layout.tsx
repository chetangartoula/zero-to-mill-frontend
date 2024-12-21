"use client";
import BottomBar from "@/components/navigation/BottomBar";
import MPINWrapper from "@/components/wrapper/mpinwrapper";
import { useAppQuery } from "@/lib/api";
import { useAppStore } from "@/store";
import getAccessToken from "@/store/actions/getAccessToken";
import { setAxiosAuthTokens } from "@/utils/token";
import React, { PropsWithChildren, useEffect, useRef } from "react";

function ProtectedLayout({ children }: PropsWithChildren) {
  const { accessToken, setAccessToken, setBalance } = useAppStore(
    (state) => state
  );
  const fetchingRef = useRef(false);
  const { data: BalanceData } = useAppQuery({
    routeName: "getBalance",
    queryKey: ["getBalance"],
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
  });

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (fetchingRef.current) return;
      try {
        fetchingRef.current = true;
        const response = await getAccessToken();
        setAccessToken(response);
        setAxiosAuthTokens(response);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      } finally {
        fetchingRef.current = false;
      }
    };
    if (!accessToken) fetchAccessToken();
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    if (BalanceData) {
      setBalance(BalanceData);
    }
  }, [BalanceData, setBalance]);

  if (!accessToken) return <p>Loading</p>;

  return (
    <MPINWrapper>
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
    </MPINWrapper>
  );
}

export default ProtectedLayout;
