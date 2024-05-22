import { useCallback, useEffect, useRef } from "react";

export const CONNECTING: "CONNECTING" = "CONNECTING";
export const OPEN: "OPEN" = "OPEN";
export const CLOSING: "CLOSING" = "CLOSING";
export const CLOSED: "CLOSED" = "CLOSED";

export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED,
};

interface IWSOptions {
  onMessage: (event: MessageEvent<string>) => void;

  onConnect?: (event: Event) => void;
  onError?: (event: Event) => void;
  onDisconnect?: (event: Event) => void;
}

export const useSocket = (url: string, options: IWSOptions) => {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(
    (token: string) => {
      const currentWebsocket = new WebSocket(`${url}?token=${token}`);
      ws.current = currentWebsocket;
      ws.current.onopen = (event: Event) => {
        if (typeof options.onConnect === "function") {
          options.onConnect(event);
        }
      };
      ws.current.onerror = (event: Event) => {
        if (typeof options.onError === "function") {
          options.onError(event);
        }
      };

      ws.current.onclose = (event: Event) => {
        if (typeof options.onDisconnect === "function") {
          options.onDisconnect(event);
        }
      };
    },
    [url, options]
  );

  useEffect(() => {
    if (ws.current) {
      if (typeof options.onConnect === "function") {
        ws.current.onopen = options.onConnect;
      }
      if (typeof options.onDisconnect === "function") {
        ws.current.onclose = options.onDisconnect;
      }
      if (typeof options.onError === "function") {
        ws.current.onerror = options.onError;
      }
    }
  }, [options, ws]);

  useEffect(() => {
    return () => {
      if (ws.current && typeof ws.current.close === "function") {
        ws.current.close();
      }
    };
  }, []);

  const sendData = useCallback(
    (data: { message: string; token: string }) => {},
    [ws]
  );

  return { connect, sendData };
};
