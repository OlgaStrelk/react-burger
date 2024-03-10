export const API_URL = "https://norma.nomoreparties.space/api/";

export const INGREDIENTS_ENDPOINT = "ingredients";

export const ORDER_ENDPOINT = "orders";

export const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);
