export const apiRoutes = {
  login: "/auth/user-login/",
  register: "/auth/register/",
  "register-otp": "/auth/verify-otp/",
  otp: "/auth/forget/request/password/",
  "access-token": "/auth/token/access/",
  "user-profile": "/auth/me/profile/",
  "set-up-pin": "/auth/me/setup-pin/",

  //re-verify
  forgotPassword: "/auth/forget-password/",
  changePassword: "/auth/me/change-password/",
  resetPassword: "/auth/reset-password/",
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
  withdraw: "/transaction/request/withdraw/",
  "load-money": "/transaction/load-admin/",
  getTransactionHistory: "/me/transactions/",
  getBalance: "/me/balance/",

  //bet slip
  betSlip: "/slip/", //get, post(for amount)
  placeBet: "/slip/betslip/", //(send overall list (overall payload {amount})) //get method provides transaction history
  betDetails: "/slip/betslip/id",
  deleteBet: "/slip/remove/id",
};

export type ApiRoutes = keyof typeof apiRoutes;
