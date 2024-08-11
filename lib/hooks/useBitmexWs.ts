'use client';
import { useVault } from '@/Providers/VaultProvider';
import bitmexClient from '@/lib/utils/clients/bitmex';
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

const useBitmexWs = <T>(table: string) => {
  const wsUrl = useVault((state) => state.terminal.wsUrl);
  const ticker = useVault((state) => state.terminal.ticker);
  const [data, setData] = useState([] as T[]);

  const { sendJsonMessage } = useWebSocket(wsUrl, {
    share: true,
    filter: (message) => {
      if (message.data !== 'pong' && JSON.parse(message.data).table === table) {
        return true;
      }
      return false;
    },
    onMessage: (message) => {
      if (message !== undefined)
        if (message !== null && JSON.parse(message.data).table === table) {
          setData(
            bitmexClient.deltaParser<T>(
              table,
              ticker,
              JSON.parse(message.data),
            ),
          );
        }
    },
  });

  return { data, sendJsonMessage };
};

export default useBitmexWs;
