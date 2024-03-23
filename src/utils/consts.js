export const API_URL = "https://norma.nomoreparties.space/api/";

export const INGREDIENTS_ENDPOINT = "ingredients";

export const ORDER_ENDPOINT = "orders";

export const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);

export const request = (url, options) => {
  return fetch(`${API_URL}${url}`, options).then(checkResponse);
};
export const modalStyle = { ingredient: "_card", order: "_order" };

export const PATHS = {
  home: "/",
  profile: "/profile",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  ingredient: "/ingredients/:id",
  ordersHistory: "/profile/orders",
  order: "/profile/orders/:number",
  notFound: "/*",
};
