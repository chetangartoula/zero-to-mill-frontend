export const PageRoutes = {
  login: "/login",
  "forgot-password": "/forgot-password",
  "sign-up": "/signup",
  "otp-verification": "/signup/otp-verify",
  "new-password": "/new-password",
  dashboard: "/dashboard",
};

export type PageRoutesType = keyof typeof PageRoutes;
