'use client';
import { useMemo, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useAppSelector } from '../redux/hooks';
import { bitmexClient } from '../utils/clients/bitmexClient';

const useBitmexWs = <T>(tableName?: string) => {
  const ticker = useAppSelector((state) => state.userContext.terminal.ticker);
  const apiKey = useAppSelector((state) => state.selectedApiKey.apiKey);
  const apiSecret = useAppSelector((state) => state.selectedApiKey.apiSecret);
  const [data, setData] = useState([] as T[]);

  const wsUrl = useMemo(() => {
    return bitmexClient.getUrl(apiKey, apiSecret);
  }, [apiKey, apiSecret]);

  const { sendJsonMessage, readyState } = useWebSocket(wsUrl, {
    filter: (message) => {
      if (
        message.data !== 'pong' &&
        JSON.parse(message.data).table === tableName
      ) {
        return true;
      }
      return false;
    },
    shouldReconnect: (closeEvent) => true,
    retryOnError: true,
    share: true,
    onMessage: (message) => {
      if (message !== undefined)
        if (message !== null && JSON.parse(message.data).table === tableName) {
          setData(
            bitmexClient.deltaParser<T>(
              tableName,
              ticker,
              JSON.parse(message.data),
            ),
          );
        }
    },
  });

  return { data, sendJsonMessage, readyState };
};

export default useBitmexWs;
