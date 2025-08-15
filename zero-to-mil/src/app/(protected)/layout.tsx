"use client";
import Loading from "@/components/loading";
import { BottomBar } from "@/components/navigation/BottomBar";
import MPINWrapper from "@/components/wrapper/mpinwrapper";
import { useAppQuery } from "@/lib/api";
import { useAppStore } from "@/store";
import getAccessToken from "@/store/actions/getAccessToken";
import { BalanceState } from "@/store/slices/balance";
import { ProfileState } from "@/store/slices/profile";
import { getJWTExpiry } from "@/utils/getJWTExpiry";
import { setAxiosAuthTokens } from "@/utils/token";
import { format } from "date-fns";
import React, { PropsWithChildren, Suspense, useEffect, useRef } from "react";

function ProtectedLayout({ children }: PropsWithChildren) {
  const {
    accessToken,
    setAccessToken,
    setBalance,
    tokenTime,
    setProfile,
    setSlip,
  } = useAppStore((state) => state);
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
  const now = new Date();
  const tokenExpireTime = format(
    new Date(now.getTime() + 1 * 60 * 1000),
    "yyyy-MM-dd HH:mm"
  );

  useEffect(() => {
    const isTimeExpired = new Date() > new Date(tokenTime);

    const fetchAccessToken = async () => {
      try {
        const response = (await getAccessToken()) as string;
        setAccessToken(response, getJWTExpiry(response) ?? "");
        setAxiosAuthTokens(response);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };
    if (isTimeExpired || !accessToken) {
      console.log("accessToken was fetched");
      fetchAccessToken();
    }
  }, [accessToken, setAccessToken, tokenTime, tokenExpireTime]);

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
