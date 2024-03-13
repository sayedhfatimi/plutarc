'use client';
import { BitmexWebSocketResponse } from '@/types/BitmexDataTypes';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { bitmexDataParser } from '../lib/utils';

export function useData<T>(ticker: string, table: string) {
  const [data, setData] = useState([] as T[]);

  const { lastJsonMessage }: { lastJsonMessage: BitmexWebSocketResponse<T> } =
    useWebSocket(
      `wss://ws.bitmex.com/realtime?subscribe=instrument:${ticker},trade:${ticker},orderBookL2_25:${ticker}`,
      {
        onOpen: () => console.log(`Connected to BitMex WebSocket API`),
        shouldReconnect: (closeEvent) => true,
        filter: (message) => {
          if (JSON.parse(message.data).table === table) {
            return true;
          } else {
            return false;
          }
        },
        heartbeat: {
          message: 'ping',
          returnMessage: 'pong',
          timeout: 60 * 1000,
          interval: 30 * 1000,
        },
        share: true,
      },
    );

  useEffect(() => {
    bitmexDataParser<T>(lastJsonMessage, data, setData, table);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return { data };
}
