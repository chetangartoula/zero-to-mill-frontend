"use client";
import AppForm from "@/components/base/form/AppForm";
import CheckBoxFormField from "@/components/formfields/CheckBoxFormField";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import { useToast } from "@/components/ui/use-toast";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/schemas/auth";
import { useAppStore } from "@/store";
import LoginUser from "@/store/actions/login";
import { LoginDTO } from "@/types/base";
import { getJWTExpiry } from "@/utils/getJWTExpiry";
import { getPageRoutes } from "@/utils/getRoutes";
import { setAxiosAuthTokens } from "@/utils/token";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const { setAccessToken } = useAppStore((state) => state);

  const handleSubmit = async (data: LoginDTO) => {
    try {
      const response = await LoginUser(data);
      if (response instanceof Error) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return;
      } else if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
        return;
      } else {
        setAccessToken(response.access, getJWTExpiry(response.access) ?? "");
        setAxiosAuthTokens(response.access);
        router.push(getPageRoutes("dashboard"));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error?.toString() || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthWrapper
      title="Welcome back"
      wrapperProps={{
        className:
          "relative sm:top-20 md:top-20 lg:top-0 xl:top-0 2xl:top-0 m-4",
      }}
    >
      <AppForm<LoginDTO>
        defaultValues={{ username: "", password: "" }}
        schema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <FormContentWrapper>
          <InputFormField
            name="username"
            label="Username"
            autoComplete="username"
          />
          <InputFormField
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <div className="flex justify-between">
            <CheckBoxFormField
              name="remember"
              checked={true}
              label="Remember me"
              formItemProps={{
                className: cn("flex items-center"),
              }}
              formLabelProps={{
                className: cn("!mt-0 !font-normal"),
              }}
            />
            <Text variant="primary">
              <Link href={getPageRoutes("forgot-password")}>
                Forgot Password
              </Link>
            </Text>
          </div>
        </FormContentWrapper>
        <Button size={"full"} type="submit">
          Login
        </Button>
        <Text className="text-center text-foreground mt-3">
          Don&apos;t have an account?{" "}
          <Link
            type="button"
            href={getPageRoutes("sign-up")}
            className="text-primary"
            onClick={(e) => e.stopPropagation()}
          >
            Sign up
          </Link>
        </Text>
      </AppForm>
    </AuthWrapper>
  );
}

export default Login;
