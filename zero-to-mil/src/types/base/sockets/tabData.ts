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

export interface MenuItems {
  name: string;
  sport_key: string;
  logo_url: string;
  data: {
    name: string;
    title: string;
    key: string;
    logo_url: string;
  }[];
}

export type MenuItemsSuccessResponse = BaseApiResponse<MenuItems[]>;
