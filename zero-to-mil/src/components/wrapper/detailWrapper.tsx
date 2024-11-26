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
    <div className={enablePadding ? "mx-3" : "mx-0"}>
      <div
        className={cn(
          "flex justify-between items-center my-7",
          enablePadding ? "mx-0" : "mx-3"
        )}
      >
        <Link href={navigationLink}>
          <DynamicIcon IconComponent={ArrowLeft} className="" />
        </Link>
        <h1 className="font-switzer font-semibold text-2xl leading-5 text-center flex-grow">
          {title}
        </h1>
        <p className="w-6"></p>
      </div>
      {children}
    </div>
  );
}

export default DetailWrapper;
