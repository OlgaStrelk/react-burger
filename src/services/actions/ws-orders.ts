import { createAction } from "@reduxjs/toolkit";
import { LiveOrdersAction } from "../types/ws";

export const connect = createAction<string, "LIVE_ORDERS_CONNECT">(
  "LIVE_ORDERS_CONNECT"
);

export const disconnect = createAction("LIVE_ORDERS_DISCONNECT");

export const wsConnecting = createAction("LIVE_ORDERS_WS_CONNECTING");

export const wsOpen = createAction("LIVE_ORDERS_WS_OPEN");

export const wsClose = createAction<string, "LIVE_ORDERS_WS_CLOSE">(
  "LIVE_ORDERS_WS_CLOSE"
);

export const wsFeed = createAction<
  LiveOrdersAction,
  "LIVE_ORDERS_WS_FEED"
>("LIVE_ORDERS_WS_FEED");

export const wsError = createAction<string, "LIVE_ORDERS_WS_ERROR">(
  "LIVE_ORDERS_WS_ERROR"
);
