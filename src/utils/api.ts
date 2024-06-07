import { useMemo } from "react";
import { API_URL, ENDPOINT, optionsWithAuth } from "./consts";
import {
  ITokenResponse,
  TAuthOptions,
  TIngredient,
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

export const checkResponse = <T>(res: CustomResponse): T => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
};

//() => Promise<undefined>
export const refreshToken = () => {
  return request<ITokenResponse>(ENDPOINT.refreshToken, {
    ...optionsWithAuth,
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((refreshData) => {
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }
    return refreshData;
  });
};

export const fetchWithRefresh = async <U>(
  url: string,
  options: TRequestOptions<TAuthOptions>
): Promise<U> => {
  try {
    return await request<U>(url, {
      ...optionsWithAuth,
      ...options,
    });
  } catch (err) {
    if (err.message === "jwt expired") {
      let refreshData = await refreshToken();
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return await request<U>(url, {
        ...optionsWithAuth,
        method: "GET",
      });
    } else {
      handleError(err);
    }
    return Promise.reject(err);
  }
};

export const request = <T>(
  url: string,
  options: TRequestOptions<TOptions> | TRequestOptions<TAuthOptions>
): Promise<T> => {
  return <Promise<T>>fetch(`${API_URL}${url}`, options).then(checkResponse);
};

export const handleError = (err: Error) => {
  if (err instanceof Error) {
    console.log(err.message);
  }
};
