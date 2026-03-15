"use client";
import MenuComponent from "@/components/custom/menu";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

function MobileMenuPage() {
  const { profile_username, profile_image } = useAppStore((state) => state);
  const getInitials = (username: string) => {
    if (!username) return "";
    return username
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <div className="flex flex-col h-screen">
      <MobileTopNav />
      <div className=" bg-menu flex flex-col flex-grow gap-2">
        <div className="flex flex-col items-center justify-center mt-6 mb-2">
          <Avatar>
            <AvatarImage
              // src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              //   profile_username
              // )}&background=random&color=000&bold=true&length=2`}
              src={profile_image}
              alt={profile_username || "User"}
            />
            <AvatarFallback className="text-foreground">
              {getInitials(profile_username) || ""}
            </AvatarFallback>
          </Avatar>
          {profile_username === "" ? (
            <p className="w-1/4 pt-4 h-3 rounded bg-muted animate"></p>
          ) : (
            <p className="text-foreground text-base font-bold mt-2">
              {profile_username}
            </p>
          )}
        </div>

        <MenuComponent />
      </div>
    </div>
  );
}

export default MobileMenuPage;
