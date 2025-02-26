"use client";
import Loading from "@/components/loading";
import { BottomBar } from "@/components/navigation/BottomBar";
import MPINWrapper from "@/components/wrapper/mpinwrapper";
import { useAppQuery } from "@/lib/api";
import { useAppStore } from "@/store";
import getAccessToken from "@/store/actions/getAccessToken";
import { BalanceState } from "@/store/slices/balance";
import { ProfileState } from "@/store/slices/profile";
import { setAxiosAuthTokens } from "@/utils/token";
import React, { PropsWithChildren, Suspense, useEffect, useRef } from "react";

function ProtectedLayout({ children }: PropsWithChildren) {
  const { accessToken, setAccessToken, setBalance, setProfile, setSlip } =
    useAppStore((state) => state);
  const fetchingRef = useRef(false);
  const { data: BalanceData } = useAppQuery<{
    email: string;
    username: string;
    profile: string;
    active_slips: number;
    balance: BalanceState;
  }>({
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
      setBalance(BalanceData.balance);
      setProfile({
        profile_email: BalanceData.email,
        profile_username: BalanceData.username,
        profile_image: BalanceData.profile,
      } as ProfileState);
      setSlip(BalanceData.active_slips);
    }
  }, [BalanceData, setBalance, setProfile, setSlip]);

  if (!accessToken) return <Loading />;

  return (
    <Suspense fallback={<p>Loading...</p>}>
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
    </Suspense>
  );
}

export default ProtectedLayout;
