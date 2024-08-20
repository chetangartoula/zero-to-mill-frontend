"use client";
import MenuCards from "@/components/base/card/menuCards";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { NavDrawerItem } from "@/constants/navDrawer";
import logout from "@/store/actions/logout";
import { getPageRoutes } from "@/utils/getRoutes";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function MobileMenuPage() {
  const router = useRouter();
  const handleLogout = async () => {
    const { status, message } = await logout();
    if (status === 200) {
      toast.success(message || "Logout successful");
      router.push(getPageRoutes("login"));
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <MobileTopNav />
      <div className="mt-6 p-4 bg-menu flex flex-col flex-grow gap-6 border">
        {NavDrawerItem.map(({ icon, value, label }, index) => (
          <MenuCards
            key={`${label}.${index}`}
            title={label}
            icon={icon}
            onClick={() => router.push(getPageRoutes(value))}
          />
        ))}
        <div className="w-full bg-muted h-1"></div>
        <MenuCards
          title="LogOut"
          icon={StarIcon}
          cardProps={{
            className: "bg-menu border-none",
          }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default MobileMenuPage;
