import { API_URL, TMethod, TOptions, optionsWithAuth } from "./consts";
interface CustomResponse extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): any;
  readonly bodyUsed: boolean;

  // readonly body: T;
}

interface TTokenResponse extends Response {
  success: true;
  accessToken: string;
  refreshToken: string;
}

const checkReponse = (res: CustomResponse) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
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
      return refreshData as TTokenResponse;
    });
};

export const fetchWithRefresh = async (
  url: string,
  options: TOptions & TMethod
) => {
  try {
    const res = await fetch(`${API_URL}${url}`, optionsWithAuth);
    return await checkReponse(res);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "jwt expired") {
        console.log('я тут')
        const refreshData = await refreshToken();
        options.headers.Authorization = refreshData.accessToken;
        const res = await fetch(`${API_URL}${url}`, optionsWithAuth);
        return await checkReponse(res);
      } else {
        console.log(err);
      }
      return Promise.reject(err);
    }
  }
};
