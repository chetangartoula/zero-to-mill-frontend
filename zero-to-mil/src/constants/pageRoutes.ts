export const PageRoutes = {
  login: "/login",
  "forgot-password": "/forgot-password",
  "sign-up": "/signup",
  "otp-verification": "/signup/otp-verify",
  "new-password": "/new-password",
  dashboard: "/dashboard",
  menu: "/menu",
  deposit: "/deposit",
  withdraw: "/withdraw",
  verify: "/verify",
  "account-setting": "/account-setting",
  "transaction-history": "/transaction-history",
};

export type PageRoutesType = keyof typeof PageRoutes;
