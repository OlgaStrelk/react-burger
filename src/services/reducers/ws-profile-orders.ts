import { createReducer } from "@reduxjs/toolkit";
import {
  wsClose,
  wsConnecting,
  wsError,
  wsOpen,
} from "../actions/ws-feed";
import { TWsOrder, WebsocketStatus } from "../../utils/types";
import { wsProfileOrders } from "../actions/ws-profile-orders";

export interface ProfileOrdersStore {
  status: WebsocketStatus;
  error: string;
  orders: TWsOrder[];
  total: number;
  totalToday: number;
}
const initialState: ProfileOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  error: "",
  orders: [],
  total: 0,
  totalToday: 0,
};
export const ProfileOrdersReducer = createReducer(initialState, (builder) => {
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
    .addCase(wsProfileOrders, (state, action) => {
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
