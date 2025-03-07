"use client";
import React, { Suspense } from "react";
import AuthWrapper from "@/components/wrapper/authWrapper";

import Loading from "@/components/loading";
import NewPasswordForm from "./_component/form";

function NewPasswordSetUp() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthWrapper
        title="Set New Password"
        wrapperProps={{
          className:
            "relative sm:top-20 md:top-20 lg:top-0 xl:top-0 2xl:top-0 m-4",
        }}
      >
        <NewPasswordForm />
      </AuthWrapper>
    </Suspense>
  );
}

export default NewPasswordSetUp;
