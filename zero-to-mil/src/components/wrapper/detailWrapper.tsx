import React, { PropsWithChildren } from "react";
import DynamicIcon from "../utils/DynamicIcon";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface DetailWrapperProps {
  title: string;
  navigationLink: string;
  enablePadding?: boolean;
}

function DetailWrapper({
  children,
  title,
  navigationLink,
  enablePadding = true,
}: PropsWithChildren<DetailWrapperProps>) {
  return (
    <div
      className={
        // test
        enablePadding ? "mx-3 pb-7 mb-7 border" : "mx-0 pb-7 mb-7 border"
      }
    >
      <div
        className={cn(
          "flex sm:justify-between md:justify-start sm:items-center my-7 ",
          enablePadding ? "mx-0" : "mx-3"
        )}
      >
        <div className="md:hidden">
          <Link href={navigationLink}>
            <DynamicIcon IconComponent={ArrowLeft} className="" />
          </Link>
        </div>

        <h1 className="font-switzer font-semibold text-2xl leading-5 text-center md:text-start flex-grow ">
          {title}
        </h1>
        <p className="w-6 md:hidden"></p>
      </div>
      {children}
    </div>
  );
}

export default DetailWrapper;
