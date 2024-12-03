export interface Outcome {
  name: string;
  price: number;
  point?: number;
}

export interface Market {
  key: string;
  outcomes: Outcome[];
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface OddList {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker;
}

// "id": "bda33adca828c09dc3cac3a856aef176",
//         "sport_key": "americanfootball_nfl",
//         "commence_time": "2021-09-10T00:20:00Z",
//         "home_team": "Tampa Bay Buccaneers",
//         "away_team": "Dallas Cowboys",
//         "bookmakers": [
//             {
//                 "key": "unibet",
//                 "title": "Unibet",
//                 "last_update": "2021-06-10T13:33:18Z",
//                 "markets": [
//                     {
//                         "key": "h2h",
//                         "outcomes": [
//                             {
//                                 "name": "Dallas Cowboys",
//                                 "price": 240
//                             },
//                             {
//                                 "name": "Tampa Bay Buccaneers",
//                                 "price": -303
//                             }
//                         ]
//                     },
//                     {
//                         "key": "spreads",
//                         "outcomes": [
//                             {
//                                 "name": "Dallas Cowboys",
//                                 "price": -109,
//                                 "point": 6.5
//                             },
//                             {
//                                 "name": "Tampa Bay Buccaneers",
//                                 "price": -111,
//                                 "point": -6.5
//                             }
//                         ]
//                     }
//                 ]
//             },
