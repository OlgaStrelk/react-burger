import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from "@reduxjs/toolkit";
import { refreshToken } from "../../utils/api";
import { RootState } from "../types";

export type TwsActionsTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
  onError: ActionCreatorWithPayload<string>;
  onClose: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = (wsActions: TwsActionsTypes): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { wsConnect, onOpen, onClose, onError, onMessage, wsDisconnect } =
        wsActions;
      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(String(event)));
        };

        socket.onmessage = (event) => {
          const { data } = event;

          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          dispatch(onClose(event.code.toString()));
        };

        if (wsDisconnect.match(action)) {
          socket.close(1000);
          dispatch(onClose("1000"));
        }
      }

      next(action);
    };
  };
};
const RECONNECT_PERIOD = 3000;

export const socketMiddlewareWithReconnect = (
  wsActions: TwsActionsTypes,
  withTockenRefresh = false
): Middleware => {
  return (store) => {
    const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } =
      wsActions;
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      // const { type, payload } = action;

      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        if (socket) {
          socket.onopen = () => {
            dispatch(onOpen());
          };

          socket.onerror = (event) => {
            dispatch(onError(String(event)));
          };

          socket.onmessage = (event) => {
            const { data } = event;

            const parsedData = JSON.parse(data);

            /*  Обновление токена  */
            if (
              withTockenRefresh &&
              parsedData.message === "Invalid or missing token"
            ) {
              refreshToken()
                .then((refreshData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    "token",
                    refreshData.accessToken.replace("Bearer ", "")
                  );
                  dispatch(wsConnect(String(wssUrl)));
                })

                .catch((err) => {
                  dispatch(onError(String(err)));
                });

              dispatch(wsDisconnect());

              return;
            }
            dispatch(onMessage(parsedData));
          };

          socket.onclose = (event) => {
            if (socket && socket.readyState === 1)
            dispatch(onClose(event.code.toString()));
          };

          /* Реконнект при обрыве связи */
          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, RECONNECT_PERIOD);
          }
        }
      }

      if (wsDisconnect.match(action) && socket) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close(1000);
        dispatch(onClose("1000"));
      }

      next(action);
    };
  };
};
