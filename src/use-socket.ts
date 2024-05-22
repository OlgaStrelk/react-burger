import { useCallback, useRef } from 'react';

export const CONNECTING: 'CONNECTING' = 'CONNECTING';
export const OPEN: 'OPEN' = 'OPEN';
export const CLOSING: 'CLOSING' = 'CLOSING';
export const CLOSED: 'CLOSED' = 'CLOSED';

export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED
};

interface IWSOptions {
  onMessage: (event: MessageEvent<string>) => void

  onConnect?: (event: Event) => void;
  onError?: (event: Event) => void;
  onDisconnect?: (event: Event) => void;
}

export const useSocket = (url: string, options: IWSOptions) => {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback((token: string) => {
    const currentWebsocket = new WebSocket(`${url}?token=${token}`)
    ws.current =currentWebsocket; 
  }, []);

  const sendData = useCallback((data: { message: string; token: string }) => {}, [ws]);

  return { connect, sendData };
};