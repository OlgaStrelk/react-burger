import { createReducer } from "@reduxjs/toolkit";
import {
  wsClose,
  wsConnecting,
  wsError,
  wsOpen,
  wsFeed,
} from "../actions/ws-feed";
import { TWsOrder, WebsocketStatus } from "../../utils/types";

export interface FeedStore {
  status: WebsocketStatus;
  error: string;
  orders: TWsOrder[];
  total: number;
  totalToday: number;
}
const initialState: FeedStore = {
  status: WebsocketStatus.OFFLINE,
  error: "",
  orders: [],
  total: 0,
  totalToday: 0,
};
export const FeedReducer = createReducer(initialState, (builder) => {
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
    .addCase(wsFeed, (state, action) => {
      state.orders = action.payload.orders.map((item) => ({
        ...item,
        status:
          item.status == "done"
            ? "Выполнен"
            : item.status == "pending"
            ? "Готовится"
            : "Создан",
      }));
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
});
