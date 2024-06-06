import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import {
  connect as LiveOrdersWsConnect,
  disconnect as LiveOrdersWsDisconnect,
  wsConnecting as LiveOrdersWsConnecting,
  wsOpen as LiveOrdersWsOpen,
  wsClose as LiveOrdersWsClose,
  wsFeed as LiveOrdersWsFeed,
  wsError as LiveOrdersWsError,
} from "./actions/ws-orders.ts";

import { rootReducer } from "./reducers/index.ts";
import { socketMiddleware } from "../middleware/socketMiddleware.ts";

const composeEnhancers =
  //@ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsActions = {
  wsConnect: LiveOrdersWsConnect,
  wsDisconnect: LiveOrdersWsDisconnect,
  wsConnecting: LiveOrdersWsConnecting,
  onOpen: LiveOrdersWsOpen,
  onClose: LiveOrdersWsClose,
  onMessage: LiveOrdersWsFeed,
  onError: LiveOrdersWsError,
};
const liveOrdersMiddleware = socketMiddleware(wsActions);
const enhancer = composeEnhancers(applyMiddleware(thunk, liveOrdersMiddleware));
const store = createStore(rootReducer, enhancer);

export default store;
