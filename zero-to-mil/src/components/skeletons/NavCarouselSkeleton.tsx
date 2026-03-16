import React from "react";

export function NavCarouselSkeleton() {
  return (
    <div className="flex space-x-4 animate-pulse gap-3 px-2">
      {[...Array(15)].map((_, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <div className="w-14 h-14 bg-muted/70 rounded-2xl"></div>
          <div className="w-12 h-3 bg-muted/70 rounded-md"></div>
        </div>
      ))}
    </div>
  );
}
