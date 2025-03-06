import { BaseApiResponse } from "@/types/global";

export interface Banner {
  id: string;
  banner_name: string;
  link: string;
  file_path: string;
}

export type BannerSuccessResponse = BaseApiResponse<Banner[]>;
