import { createAction } from "@reduxjs/toolkit";
import { LiveFeedAction } from "../types/ws";

export const connect = createAction<string, "LIVE_FEED_CONNECT">(
  "LIVE_FEED_CONNECT"
);

export const disconnect = createAction("LIVE_FEED_DISCONNECT");

export const wsConnecting = createAction("LIVE_FEED_WS_CONNECTING");

export const wsOpen = createAction("LIVE_FEED_WS_OPEN");

export const wsClose = createAction<string, "LIVE_FEED_WS_CLOSE">(
  "LIVE_FEED_WS_CLOSE"
);

export const wsFeed = createAction<
  LiveFeedAction,
  "LIVE_FEED_WS_ORDERS"
>("LIVE_FEED_WS_ORDERS");

export const wsError = createAction<string, "LIVE_FEED_WS_ERROR">(
  "LIVE_FEED_WS_ERROR"
);
