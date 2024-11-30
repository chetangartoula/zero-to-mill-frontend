"use client";
import BottomBar from "@/components/navigation/BottomBar";
import MPINWrapper from "@/components/wrapper/mpinwrapper";
import { useAppMutation } from "@/lib/api";
import { useAppStore } from "@/store";
import getAccessToken from "@/store/actions/getAccessToken";
import { setAxiosAuthTokens } from "@/utils/token";
import React, { PropsWithChildren, useEffect } from "react";

function ProtectedLayout({ children }: PropsWithChildren) {
  const { accessToken, setAccessToken } = useAppStore((state) => state);

  // const { mutate } = useAppMutation("access-token", {});

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await getAccessToken();
        console.log("response", response);
        setAccessToken(response);
        setAxiosAuthTokens(response);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };
    // if (!accessToken)
    //   mutate({
    //     refresh:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMzQyMTM5OCwiaWF0IjoxNzMyODE2NTk4LCJqdGkiOiIwMDcxZjMwZjFmNzE0OWYzODgzYTNlMzQxZjNlNDIyZSIsInVzZXJfaWQiOjI4fQ.Iv5gk7ttQ4ZMz9feiwvH8zRZy8H0B9MLEVI03mDeVII",
    //   });
    if (!accessToken) fetchAccessToken();
  }, [accessToken, setAccessToken]);

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
