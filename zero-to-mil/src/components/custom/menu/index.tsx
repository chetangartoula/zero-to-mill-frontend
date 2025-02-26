"use client";
import MenuCards from "@/components/base/card/menuCards";
import { useToast } from "@/components/ui/use-toast";
import { NavDrawerItem } from "@/constants/navDrawer";
import logout from "@/store/actions/logout";
import { getPageRoutes } from "@/utils/getRoutes";
import { clearAxiosAuthTokens } from "@/utils/token";
import { StarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function MenuComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const handleLogout = async () => {
    const res = await logout();
    if (res.status === 200) {
      clearAxiosAuthTokens();
      toast({
        title: "Logged Out",
        description: "You have been logged out",
        variant: "success",
      });
      router.push(getPageRoutes("login"));
    }
  };
  return (
    <div className="px-4 flex flex-col flex-grow gap-4">
      {NavDrawerItem.map(({ icon, value, label }, index) => (
        <MenuCards
          key={`${label}.${index}`}
          title={label}
          icon={icon}
          isActive={pathname === getPageRoutes(value)}
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
  );
}

export default MenuComponent;
