import { TAuthOptions, TOptions } from "./types";

export const passwordStub = "********";
export const API_URL = "https://norma.nomoreparties.space/api/";

export const PATHS = {
  home: "/",
  profile: "/profile",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  ingredient: "/ingredients/:id",
  profileOrder: "/profile/orders/:number",
  ordersHistory: "/profile/orders",
  order: "/feed/:number",
  ordersList: "/feed",
  notFound: "/*",
};

const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");

export const WS_BASE_URL = "wss://norma.nomoreparties.space/orders";
export const WSURL = `${WS_BASE_URL}/all`;
export const WSWithToken = `${WS_BASE_URL}?token=${token}`;

export const ENDPOINT = {
  ingredients: "ingredients",
  resetPasswordStepOne: "password-reset",
  resetPasswordStepTwo: "password-reset/reset",
  orders: "orders",
  register: "auth/register",
  login: "auth/login",
  logout: "auth/logout",
  refreshToken: "auth/token",
  user: "auth/user",
};

export const BACKEND_VALIDATION_TEXT = {
  conflictErrorText: "к сожалению, этот email уже занят",
  badRequestErrorText: "введенный вами email некорректен",
  authorizationErrorText: "ошибка авторизации",
  serverRespondErrorText: "сервер не отвечает",
};

export const modalStyle = { ingredient: "_card", order: "_order" };

export const optionsUnAuth: TOptions = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};
export const optionsWithAuth: TAuthOptions = {
  ...optionsUnAuth,
  headers: {
    ...optionsUnAuth.headers,
    Authorization: localStorage.getItem("accessToken") as string,
  },
};
