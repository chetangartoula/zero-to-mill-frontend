import MenuComponent from "@/components/custom/menu";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import React, { PropsWithChildren } from "react";

function FormLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="md:hidden w-full flex flex-col relative min-h-[calc(100vh-5rem)]">
        {children}
      </div>
      <div className="hidden md:flex flex-col justify-center w-full">
        <div className="w-full mb-4">
          <MobileTopNav />
        </div>
        <div className="w-full flex justify-center mx-auto">
          <div className="flex gap-6 w-4/6">
            <div className="w-1/3">
              <h1 className="font-switzer font-semibold text-2xl leading-5 ml-4 flex-grow mt-7">
                Menu
              </h1>
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
