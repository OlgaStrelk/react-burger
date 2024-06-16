import { configureStore } from "@reduxjs/toolkit";

import { thunk } from "redux-thunk";
import {
  connect as LiveFeedWsConnect,
  disconnect as LiveFeedWsDisconnect,
  wsConnecting as LiveFeedWsConnecting,
  wsOpen as LiveFeedWsOpen,
  wsClose as LiveFeedWsClose,
  wsFeed as LiveFeedWsOrders,
  wsError as LiveFeedWsError,
} from "./actions/ws-feed.ts";

import {
  connect as LiveProfileOrdersWsConnect,
  disconnect as LiveProfileOrdersWsDisconnect,
  wsConnecting as LiveProfileOrdersWsConnecting,
  wsOpen as LiveProfileOrdersWsOpen,
  wsClose as LiveProfileOrdersWsClose,
  wsProfileOrders as LiveProfileOrdersWsOrders,
  wsError as LiveProfileOrdersWsError,
} from "./actions/ws-profile-orders.ts";

import { rootReducer } from "./reducers/index.ts";
import { socketMiddlewareWithReconnect } from "./middleware/socketMiddleware.ts";

const wsFeedActions = {
  wsConnect: LiveFeedWsConnect,
  wsDisconnect: LiveFeedWsDisconnect,
  wsConnecting: LiveFeedWsConnecting,
  onOpen: LiveFeedWsOpen,
  onClose: LiveFeedWsClose,
  onMessage: LiveFeedWsOrders,
  onError: LiveFeedWsError,
};
const wsProfileOrdersActions = {
  wsConnect: LiveProfileOrdersWsConnect,
  wsDisconnect: LiveProfileOrdersWsDisconnect,
  wsConnecting: LiveProfileOrdersWsConnecting,
  onOpen: LiveProfileOrdersWsOpen,
  onClose: LiveProfileOrdersWsClose,
  onMessage: LiveProfileOrdersWsOrders,
  onError: LiveProfileOrdersWsError,
};

const liveFeedMiddleware = socketMiddlewareWithReconnect(wsFeedActions);

const liveProfileOrdersMiddleware = socketMiddlewareWithReconnect(
  wsProfileOrdersActions
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        thunk,
        liveFeedMiddleware,
        liveProfileOrdersMiddleware
      )

});

export default store;
