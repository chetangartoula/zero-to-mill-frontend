import React from "react";

type Props = {
  size?: "sm" | "md" | "lg";
  color?: string;
};

function Loading({ size = "md", color = "border-primary" }: Props) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className={`${sizeClasses[size]} border-2 border-t-transparent ${color} rounded-full animate-spin`}
      ></div>
      <span className="ml-4 text-lg animate-pulse">Loading...</span>
    </div>
  );
}

export default Loading;
