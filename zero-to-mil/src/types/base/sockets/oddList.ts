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
  oddID: string;
  odds: string;
  opposingOddID: string;
}

export interface Props {
  market_name: string;
  oddID: string;
  odds: string;
  opposingOddID: string;
  points: string;
}

export interface Bookmaker {
  odds: {
    ml: {
      away: Odd;
      home: Odd;
    };
    ml3way: {
      away: Odd;
      home: Odd;
      draw: Odd;
    };
  };
  props: {
    [key: string]: {
      title: string;
      points: {
        odd_id: string;
        odds: string;
        points: string;
        game_name: string;
      }[];
    }[];
  };
}
export interface OddList {
  id: string;
  sport_id: string;
  sport_key: string;
  sport_title: string;
  last_update: string;
  commence_time: string;
  home_team: string;
  home_team_short: string;
  away_team_short: string;
  image_url: string;
  away_team: string;
  bookmaker: Bookmaker;
}
