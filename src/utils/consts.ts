export const API_URL = "https://norma.nomoreparties.space/api/";

export const PATHS = {
  home: "/",
  profile: "/profile",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  ingredient: "/ingredients/:id",
  ordersHistory: "orders",
  order: ":number",
  ordersList: "orders",
  notFound: "/*",
};

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

export const request = (url: string, options: object) => {
  return fetch(`${API_URL}${url}`, options).then(checkResponse);
};

export const checkResponse = (res: any) =>
  res.ok ? res.json() : Promise.reject(res.status);

export const handleError = (action: string, err: Error, dispatch: any) => {
  if (err instanceof Error) {
    console.log(err);
    dispatch({ type: action });
  }
};

export const optionsWithAuth: TOptions = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    Authorization: localStorage.getItem("accessToken") as string,
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

export type TOptions = {
  headers: { Authorization?: string; "Content-Type": string };
  mode?: RequestMode;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  body?: string;
};

export type TMethod = { method: "GET" | "POST" | "PATCH" };
