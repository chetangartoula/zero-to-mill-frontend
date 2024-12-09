import React, { PropsWithChildren } from "react";
import { SetMPINForm } from "../custom/accountSetting";
import AuthWrapper from "./authWrapper";
import Text from "../ui/text";
import { useAppMutation, useAppQuery } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/store";

export interface MPINWrapperProps {
  initialSignup?: boolean;
  isMPIN?: boolean;
  displayonEveryRender?: boolean;
}
export interface MPINProps {
  intial_sign_up: boolean;
  is_mpin_set: boolean;
  display_every_render: boolean;
}

function MPINWrapper({ children }: PropsWithChildren) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setMPINState } = useAppStore((state) => state);
  const { data } = useAppQuery<MPINProps>({
    routeName: "getMPIN",
    queryKey: ["getMPIN"],
    retry: false,
    refetchOnWindowFocus: false,
  });
  const { mutate } = useAppMutation(
    "getMPIN",
    {
      onSuccess: async (data) => {
        setMPINState(data);
        queryClient.invalidateQueries({ queryKey: ["getMPIN"] });
        router.push("/dashboard");
      },
      onError: (error) => {
        console.error("Failed to fetch MPIN:", error);
        queryClient.invalidateQueries({ queryKey: ["getMPIN"] });
        router.push("/dashboard");
      },
    },
    {
      method: "PATCH",
    }
  );
  const { intial_sign_up, display_every_render, is_mpin_set } = data || {
    intial_sign_up: false,
    display_every_render: false,
    is_mpin_set: true,
  };

  if (intial_sign_up || (display_every_render && !is_mpin_set)) {
    return (
      <AuthWrapper
        title="Set your MPIN"
        includeLogo={false}
        wrapperProps={{
          className: "relative top-20",
        }}
        titleProp={"text-left"}
      >
        <Text
          text={`To maintain secure transactions you will need to set a MPIN`}
          className="my-2 tracking-widest"
        />
        <SetMPINForm
          onSkip={() =>
            mutate({
              intial_sign_up: false,
            })
          }
          displaySkip
        />
      </AuthWrapper>
    );
  }
  return <>{children}</>;
}

export default MPINWrapper;
