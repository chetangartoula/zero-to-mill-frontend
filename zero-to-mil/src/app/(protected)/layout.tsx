import BottomBar from "@/components/navigation/BottomBar";
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

    fetchAccessToken();
  }, []);
  return (
    <div>
      {children}
      <BottomBar />
    </div>
  );
}

export default ProtectedLayout;
