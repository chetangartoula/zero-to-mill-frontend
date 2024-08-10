export const PageRoutes = {
  login: "./login",
  "forgot-password": "./forgot-password",
  "sign-up": "./sign-up",
  "otp-verification": "./forgot-password/otp-verification",
  "new-password": "./new-password",
  dashboard: "./dashboard",
};

export type PageRoutesType = keyof typeof PageRoutes;
