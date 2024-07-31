import React, { PropsWithChildren } from "react";
import DynamicIcon from "../utils/DynamicIcon";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface DetailWrapperProps {
  title: string;
  navigationLink: string;
}

function DetailWrapper({
  children,
  title,
  navigationLink,
}: PropsWithChildren<DetailWrapperProps>) {
  return (
    <div className="mx-3">
      <div className="flex justify-between items-center my-7">
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
