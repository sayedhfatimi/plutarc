'use client';
import useWebSocket from 'react-use-websocket';
import { useAppSelector } from '../redux/hooks';
import { bitmexDeltaParser } from '../utils';
import { useState } from 'react';
import { bitmexClient } from '../utils/bitmex/bitmexClient';

const useData = <T>(tableName: string) => {
  const selectedTicker = useAppSelector(
    (state) => state.userContext.selectedTicker,
  );
  const [data, setData] = useState([] as T[]);

  bitmexClient.invoke();

  const { sendJsonMessage } = useWebSocket(
    `wss://ws.bitmex.com/realtime?subscribe=orderBookL2:${selectedTicker},trade:${selectedTicker},instrument:${selectedTicker}`,
    {
      filter: (message) => {
        if (
          message.data !== 'pong' &&
          JSON.parse(message.data).table === tableName
        ) {
          return true;
        } else {
          return false;
        }
      },
      shouldReconnect: (closeEvent) => true,
      retryOnError: true,
      share: true,
      onMessage: (message) => {
        if (message !== undefined)
          if (
            message !== null &&
            JSON.parse(message.data).table === tableName
          ) {
            setData(
              bitmexDeltaParser<T>(
                tableName,
                selectedTicker,
                bitmexClient,
                JSON.parse(message.data),
              ),
            );
          }
      },
    },
  );

  return { data, sendJsonMessage };
};

export default useData;
