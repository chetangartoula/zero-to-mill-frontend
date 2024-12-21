import React from "react";

export function NavCarouselSkeleton() {
  return (
    <div className="flex space-x-4 animate-pulse gap-3 px-4">
      {[...Array(15)].map((_, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="w-14 h-4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}
