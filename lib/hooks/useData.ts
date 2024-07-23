'use client';
import useWebSocket from 'react-use-websocket';
import { useAppSelector } from '../redux/hooks';
import { bitmexDeltaParser } from '../utils';
import { useState } from 'react';

const useData = <T>(
  table: string,
  keys?: string | string[],
  length?: number,
) => {
  const selectedTicker = useAppSelector(
    (state) => state.userContext.selectedTicker,
  );
  const [data, setData] = useState([] as T[]);

  const { sendJsonMessage } = useWebSocket(
    `wss://ws.bitmex.com/realtime?subscribe=orderBookL2:${selectedTicker},trade:${selectedTicker},instrument:${selectedTicker}`,
    {
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
      shouldReconnect: (closeEvent) => true,
      retryOnError: true,
      share: true,
      onMessage: (message) =>
        bitmexDeltaParser<T>(
          JSON.parse(message.data),
          data,
          setData,
          table,
          keys,
          length,
        ),
    },
  );

  return { data, sendJsonMessage };
};

export default useData;
