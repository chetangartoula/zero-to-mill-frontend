import { BaseApiResponse } from "../../global/response";
export interface TabData {
  active: boolean;
  has_outrights: boolean;
  imageUrl: string;
  description: string;
  key: string;
  title: string;
}

export interface CarouselData {
  key: string;
  name: string;
  logo_url?: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
}

export type MenuItems = Omit<CarouselData, "icon">;

export type MenuItemsSuccessResponse = BaseApiResponse<MenuItems[]>;
