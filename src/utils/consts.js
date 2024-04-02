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

export const request = (url, options) => {
  return fetch(`${API_URL}${url}`, options).then(checkResponse);
};

export const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);
