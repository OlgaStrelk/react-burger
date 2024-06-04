import { createReducer } from "@reduxjs/toolkit";
import { TWsOrder, WebsocketStatus } from "../types/ws";
import {
  wsClose,
  wsConnecting,
  wsError,
  wsOpen,
  wsMessage,
} from "../actions/ws-orders";

export interface LiveOrdersStore {
  status: WebsocketStatus;
  error: string;
  orders: TWsOrder[];
  total: number;
  totalToday: number;
}
const initialState: LiveOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  error: "",
  orders: [],
  total: 0,
  totalToday: 0,
};
export const liveOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = "";
    })
    .addCase(wsError, (state, action) => {
      state.status = WebsocketStatus.OFFLINE;
      state.error = action.payload;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
});
