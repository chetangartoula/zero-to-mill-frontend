export interface Outcome {
  name: string;
  price: number;
  point?: number;
}

export interface Market {
  key: string;
  outcomes: Outcome[];
}
export interface Odd {
  bookmaker: unknown;
  market_name: string;
  oddId: string;
  odds: string;
  opposinOddID: string;
}

export interface Props {
  market_name: string;
  oddId: string;
  odds: string;
  opposingOddID: string;
  points: string;
}

export interface Bookmaker {
  odds: {
    ml: unknown;
    ml3way: unknown;
  };
  props: unknown;
}
export interface OddList {
  id: string;
  sport_id: string;
  sport_key: string;
  sport_title: string;
  last_update: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmaker: Bookmaker;
}
