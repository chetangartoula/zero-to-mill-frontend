export const PageRoutes = {
  login: "/login",
  "forgot-password": "/forgot-password",
  "sign-up": "/signup",
  "otp-verification": "/signup/otp-verify",
  "new-password": "/new-password",
  dashboard: "/dashboard",
  menu: "/menu",
  betslip: "/betslip",
  history: "/history",
  deposit: "/deposit",
  withdraw: "/withdraw",
  "withdraw-verify": "/withdraw/verify",
  verify: "/verify",
  favourites: "/favourites",
  "account-setting": "/account-setting",
  "bet-detail": "/history/HistoryId",
  notifications: "/notifications",
};

export type PageRoutesType = keyof typeof PageRoutes;
