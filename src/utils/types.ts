import { LegacyRef, ReactNode } from "react";
export type TTitle = { title: string; value: string; id: number };

export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  quantity: number;
};

export type TInput = {
  id: number | string;
  placeholder: string;
  name: string;
  type: "email" | "text" | "password" | undefined;
  value: string;
};

export type TConstructorIngredient = TIngredient & { id: string };

export interface INavBar {
  id: string | number;
  text: string;
  style: string;
  icon: ReactNode | string;
}

export type TOrder = {
  // buns: number;
};

export type TTitles = {
  id: string | number;
  ref: LegacyRef<HTMLDivElement>;
  title: string;
  value: string;
};

export type TOptions = {
  headers: { "Content-Type": string };
  mode?: RequestMode;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  body?: string;
};

export type TAuthOptions = TOptions & {
  headers: { Authorization: string };
};

export type TMethod = { method: "GET" | "POST" | "PATCH" };

export type TRequestOptions<Auth> = TMethod & Auth;

export type TUser = { name: string; email: string };

export type TUserWithPassword = TUser & { password: string };
export interface ISuccessResponse extends Response {
  success: true;
}

export interface IUserSuccessResponse extends ISuccessResponse {
  user: TUser;
}

export interface ITokenResponse extends ISuccessResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IResetPasswordResponse extends ISuccessResponse {
  message: string;
}
export type TAuthorizationResonse = IUserSuccessResponse & ITokenResponse;

export interface IIngredientsResponse extends ISuccessResponse {
  data: TIngredient[];
}

export interface IMakeOrderResponse extends ISuccessResponse {
  name: string;
  order: {
    number: number;
  };
}

export type TOrderResponse = {
  ingredients: string[];
  owner: string;
  status: "done" | "" | "";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};
export interface IGetOrderResponse extends ISuccessResponse {
  orders: TOrderResponse[];
}
export type TMakeOrderRequest = { ingredients: string[] };
