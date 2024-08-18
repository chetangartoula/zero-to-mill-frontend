export const apiRoutes = {
  login: "/auth/user-login/",
  register: "/auth/register/",
  otp: "/auth/verify-otp/",
  "access-token": "/auth/token/refresh/",
  "user-profile": "/auth/me/profile/",
  "set-up-pin": "/auth/me/setup-pin/",
  //re-verify
  forgotPassword: "/forgot-password/",
  resetPassword: "/reset-password/",
  verifyEmail: "/verify-email/",

  // transaction
  "load-money": "/transaction/load-admin/",
};

export type ApiRoutes = keyof typeof apiRoutes;
