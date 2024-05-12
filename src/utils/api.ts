import { API_URL, optionsWithAuth } from "./consts";
import {
  ITokenResponse,
  TAuthOptions,
  TOptions,
  TRequestOptions,
} from "./types";
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

const checkReponse = <T>(res: CustomResponse): T => {
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
    .then(checkReponse<ITokenResponse>)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData as ITokenResponse;
    });
};

export const fetchWithRefresh = async <U>(
  url: string,
  options: TRequestOptions<TAuthOptions>
) => {
  try {
    const res = await fetch(`${API_URL}${url}`, {
      ...optionsWithAuth,
      ...options,
    });
    return await (<U>checkReponse(res));
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "jwt expired") {
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

export const request = <T>(
  url: string,
  options: TRequestOptions<TOptions> | TRequestOptions<TAuthOptions>
): Promise<T> => {
  return <Promise<T>>fetch(`${API_URL}${url}`, options).then(checkReponse);
};

export const handleError = (action: string, err: Error, dispatch: any) => {
  if (err instanceof Error) {
    dispatch({ type: action });
    console.log(err.message);
  }
};
