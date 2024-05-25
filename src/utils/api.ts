import { API_URL, ENDPOINT, optionsWithAuth } from "./consts";
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

export const refreshToken = () => {
  return request<ITokenResponse>(ENDPOINT.refreshToken, {
    ...optionsWithAuth,
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((refreshData) => {
    if (!refreshData.success) {
      console.log('что-то пошло не так с refreshToken', refreshData)
      return Promise.reject(refreshData);
    }
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
  });
};

export const fetchWithRefresh = async <U>(
  url: string,
  options: TRequestOptions<TAuthOptions>
): Promise<U | undefined> => {
  try {
    console.log('fetchWithRefresh')
    // localStorage.setItem("accessToken", 'n');

    return await request<U>(url, {
      ...optionsWithAuth,
      ...options,
    });
  } catch (err) {
    console.log('long was waiting',err)
    if (err) {
      console.log(typeof err)

      if (err.message  === "jwt expired") {
        console.log('tut')

        const refreshData = await refreshToken();
        console.log('refreshData',refreshData)

        optionsWithAuth.headers.Authorization = refreshData.accessToken;
        await request<U>(url, {
          ...optionsWithAuth,
          method: "GET",
        });
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
  return <Promise<T>>fetch(`${API_URL}${url}`, options).then(checkResponse);
};

export const handleError = (action: string, err: Error, dispatch: any) => {
  if (err instanceof Error) {
    dispatch({ type: action });
    console.log(err.message);
  }
};
