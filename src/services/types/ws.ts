import { TWsOrder } from "../../utils/types";

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
