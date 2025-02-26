import React, { PropsWithChildren } from "react";

interface AuthProps extends PropsWithChildren {}

function AuthLayout({ children }: AuthProps) {
  return (
    <>
      <div className="md:hidden w-full flex flex-col relative top-20 min-h-[calc(100vh-5rem)]">
        {children}
      </div>
      <div className="hidden md:flex w-full h-screen fixed items-center justify-center">
        <div className="w-1/3 bg-menu h-auto p-4 rounded-xl">{children}</div>
      </div>
    </>
  );
}

export default AuthLayout;
