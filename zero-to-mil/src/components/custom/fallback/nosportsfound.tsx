import Image from "next/image";
import React from "react";

function Nosportsfound() {
  return (
    <div className="flex flex-col justify-center items-center h-96">
      <Image
        src="/betsnotavailable.svg"
        alt="No Sports Found"
        width={200}
        height={200}
      />
      <p className="text-2xl font-semibold pt-4">No Matches Available</p>
      <span className="text-muted font-light text-sm">
        Please check other categories
      </span>
    </div>
  );
}

export default Nosportsfound;
