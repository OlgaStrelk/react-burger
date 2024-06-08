import { API_URL, ENDPOINT, optionsUnAuth, optionsWithAuth } from "./consts";
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

export const checkResponse = <T>(res: CustomResponse): T => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
};

//() => Promise<undefined>
// export const refreshToken = () => {
//   return request<ITokenResponse>(ENDPOINT.refreshToken, {
//     ...optionsWithAuth,
//     method: "POST",
//     body: JSON.stringify({
//       token: localStorage.getItem("refreshToken"),
//     }),
//   }).then((refreshData) => {
//     if (!refreshData.success) {
//       return Promise.reject(refreshData);
//     }
//     return refreshData;
//   });
// };

export const refreshToken = () => {
  return request<ITokenResponse>(ENDPOINT.refreshToken, {
    ...optionsWithAuth,
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
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
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      optionsWithAuth.headers.Authorization = refreshData.accessToken;
      return await request<U>(url, {
        ...optionsWithAuth,
        method: "GET",
      });
    } else {
      return Promise.reject(err);
    }
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
