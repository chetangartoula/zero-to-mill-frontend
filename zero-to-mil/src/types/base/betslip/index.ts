import { BaseApiResponse } from "@/types/global";

export interface BetSlipProps {
  sport_id: string;
  sport_key: string;
  sport_title: string;
  home_team: string;
  away_team: string;
  bookmaker_key: string;
  selected_team: string;
  odds: number;
  market_key: string;
}

export type BetSlpPropSuccessResponse = BaseApiResponse<BetSlipProps>;
