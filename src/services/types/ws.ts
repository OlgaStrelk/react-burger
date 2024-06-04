export type TWsOrder = {
  ingredients: string[];
  _id: string;
  status: "done";
  number: 0;
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

export enum LiveOrdersActionType {
  DATA = "data",
}

export type Data = { type: LiveOrdersActionType.DATA; data: TWsOrdersResonse };
export type LiveOrdersAction = TWsOrdersResonse;

