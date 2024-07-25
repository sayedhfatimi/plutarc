'use client';
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useAppSelector } from '../redux/hooks';
import { bitmexClient } from '../utils/clients/bitmexClient';

const useBitmexWs = <T>(tableName: string) => {
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
              bitmexClient.deltaParser<T>(
                tableName,
                selectedTicker,
                JSON.parse(message.data),
              ),
            );
          }
      },
    },
  );

  return { data, sendJsonMessage };
};

export default useBitmexWs;
