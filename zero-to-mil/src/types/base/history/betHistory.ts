export interface BetHistoryApiProps {
  created_date: string;
  bet_amount: string;
  bet_status: string;
  is_active: boolean;
  slip_type: string;
  total_odds: number;
  total: number;
  completed: number;
  remaining: number;
  slip_id: string;
}

export interface BetSlips {
  commence_time: string;
  started: boolean;
  selected_team: string;
  odds: number;
  sports_status: string;
  home_team: string;
  away_team: string;
  sports_id: string;
  match_title: string;
}

export interface BetHistoryDetailsApiProps extends BetHistoryApiProps {
  bet_slips: BetSlips[];
}
