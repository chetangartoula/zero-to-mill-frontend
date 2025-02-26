"use client";
import MenuComponent from "@/components/custom/menu";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

function MobileMenuPage() {
  const { profile_username } = useAppStore((state) => state);
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
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile_username
              )}&background=f0f0f0&color=000&bold=true&length=2`}
              alt={profile_username || "User"}
            />
            <AvatarFallback>
              {getInitials(profile_username) || ""}
            </AvatarFallback>
          </Avatar>
          <p className="text-white text-base font-bold mt-2">
            {profile_username}
          </p>
        </div>

        <MenuComponent />
      </div>
    </div>
  );
}

export default MobileMenuPage;
