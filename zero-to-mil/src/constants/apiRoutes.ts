export const apiRoutes = {
  login: "/auth/user-login/",
  register: "/auth/register/",
  otp: "/auth/verify-otp/",
  "access-token": "/auth/token/access/",
  "user-profile": "/auth/me/profile/",
  "set-up-pin": "/auth/me/setup-pin/",

  //re-verify
  forgotPassword: "/forgot-password/",
  changePassword: "/auth/me/change-password/",
  resetPassword: "/reset-password/",
  verifyEmail: "/verify-email/",
  accountSettings: "/account-settings/",

  //mpin
  getMPIN: "/config/gurd-verification/",
  setMPIN: "/auth/me/setup-pin/",
  changeMPIN: "/auth/me/change-pin/",

  //options
  "cash-options": "/config/cash-options/",

  //nav list
  "menu-items": "/sports/menu-items/",

  // transaction
  deposit: "/transaction/request/load/",
  withdraw: "/transaction/request/unload/",
  "load-money": "/transaction/load-admin/",
  getTransactionHistory: "me/transactions/",
  getBetHistory: "/me/bets/",
  getBalance: "/me/balance/",

  //bet slip
  getBetSlip: "/slip/",
  deleteBet: "/slip/remove/:id",
};

export type ApiRoutes = keyof typeof apiRoutes;
