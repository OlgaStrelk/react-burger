import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from "@reduxjs/toolkit";

export type TwsActionsTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
  onError: ActionCreatorWithPayload<string>;
  onClose: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = (
  wsActions: TwsActionsTypes
):Middleware => {
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
          console.log(parsedData);

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
