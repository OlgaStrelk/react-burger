export type TWsOrder = {
  ingredients: string[];
  _id: string;
  status: "done";
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
export type TWsOrdersResonse = {
  success: boolean;
  orders: TWsOrder[];
  total: number;
  totalToday: number;
};

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type LiveOrdersAction = TWsOrdersResonse;
