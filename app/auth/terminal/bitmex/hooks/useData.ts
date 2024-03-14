'use client';
import { BitmexWebSocketResponse } from '@/types/BitmexDataTypes';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { bitmexDataParser } from '../lib/utils';

export function useData<T>(ticker: string, table: string) {
  const [data, setData] = useState([] as T[]);

  const { lastJsonMessage }: { lastJsonMessage: BitmexWebSocketResponse<T> } =
    useWebSocket(`wss://ws.bitmex.com/realtime`, {
      filter: (message) => {
        if (
          message.data !== 'pong' &&
          JSON.parse(message.data).table === table
        ) {
          return true;
        } else {
          return false;
        }
      },
      share: true,
    });

  useEffect(() => {
    setData([]);
  }, [ticker]);

  useEffect(() => {
    bitmexDataParser<T>(lastJsonMessage, data, setData, table);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return { data };
}
