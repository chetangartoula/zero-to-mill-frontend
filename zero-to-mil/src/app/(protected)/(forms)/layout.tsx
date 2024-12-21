import MenuComponent from "@/components/custom/menu";
import React, { PropsWithChildren } from "react";

function FormLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="md:hidden w-full flex flex-col relative min-h-[calc(100vh-5rem)]">
        {children}
      </div>
      <div className="hidden md:flex justify-center w-full h-screen mt-4">
        <div className="w-4/6">
          <div className="flex">
            <div className="w-1/3">
              <MenuComponent />
            </div>
            <div className="w-2/3">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormLayout;
