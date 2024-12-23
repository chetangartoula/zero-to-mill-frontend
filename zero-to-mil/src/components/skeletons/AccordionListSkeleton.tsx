import React from "react";

export function AccordionListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse mt-4">
      <div className="border rounded bg-menu p-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-4 bg-gray-300 rounded"></div>
        </div>
        {/* <div className="mt-4 space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-14 bg-gray-300 rounded"></div>
          ))}
        </div> */}
      </div>
      {[...Array(10)].map((_, index) => (
        <div key={index} className="border rounded bg-menu p-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
