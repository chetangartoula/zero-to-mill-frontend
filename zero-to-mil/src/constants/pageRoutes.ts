export const PageRoutes = {
  login: "/login",
  "forgot-password": "/forgot-password",
  "sign-up": "/signup",
  "otp-verification": "/signup/otp-verify",
  "new-password": "/new-password",
  dashboard: "/dashboard",
  menu: "/menu",
  betslip: "/betslip",
  history: "/transaction-history",
  deposit: "/deposit",
  withdraw: "/withdraw",
  "withdraw-verify": "/withdraw/verify",
  verify: "/verify",
  "account-setting": "/account-setting",
  "transaction-history": "/transaction-history",
  "transaction-detail": "/transaction-history/:TransactionId",
};

export type PageRoutesType = keyof typeof PageRoutes;
