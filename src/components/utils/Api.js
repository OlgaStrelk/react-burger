import { INGREDIENTS_API_URL } from "./consts";
export const getIngredients = () => {
  return fetch(INGREDIENTS_API_URL).then((res) =>
    res.ok ? res.json() : Promise.reject(res.status)
  );
};
