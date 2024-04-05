import { API_URL } from "./consts";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${API_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkReponse)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData;
    });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(`${API_URL}${url}`, options);
    return await checkReponse(res);
  } catch (err) {
    console.log(err);
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${API_URL}${url}`, options);
      return await checkReponse(res);
    } else {
      console.log(err);

      return Promise.reject(err);
    }
  }
};
