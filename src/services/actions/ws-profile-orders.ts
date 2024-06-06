import { createAction } from "@reduxjs/toolkit";
import { LiveProfileOrdersAction } from "../types/ws";

export const connect = createAction<string, "LIVE_PROFILE_ORDERS_CONNECT">(
  "LIVE_PROFILE_ORDERS_CONNECT"
);

export const disconnect = createAction("LIVE_PROFILE_ORDERS_DISCONNECT");

export const wsConnecting = createAction("LIVE_PROFILE_ORDERS_WS_CONNECTING");

export const wsOpen = createAction("LIVE_PROFILE_ORDERS_WS_OPEN");

export const wsClose = createAction<string, "LIVE_PROFILE_ORDERS_WS_CLOSE">(
  "LIVE_PROFILE_ORDERS_WS_CLOSE"
);

export const wsProfileOrders = createAction<
  LiveProfileOrdersAction,
  "LIVE_PROFILE_ORDERS_WS_ORDERS"
>("LIVE_PROFILE_ORDERS_WS_ORDERS");

export const wsError = createAction<string, "LIVE_PROFILE_ORDERS_WS_ERROR">(
  "LIVE_PROFILE_ORDERS_WS_ERROR"
);
