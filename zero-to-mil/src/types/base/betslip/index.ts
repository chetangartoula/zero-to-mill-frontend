import { BaseApiResponse } from "@/types/global";

export interface BetSlipProps {
  commence_time: string;
  match_title: string;
  sport_id: string;
  sport_key: string;
  sport_title: string;
  home_team: string;
  away_team: string;
  bookmaker_key: string;
  odds: number;
  market_key: string;
  //made to matc type match later
  selected_team: string;
}

export type BetSlpPropSuccessResponse = BaseApiResponse<BetSlipProps>;
