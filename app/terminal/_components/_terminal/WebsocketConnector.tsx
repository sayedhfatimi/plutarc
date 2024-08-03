'use client';
import { useVault } from '@/Providers/VaultProvider';
import BitMEXClient from '@/lib/utils/clients/bitmex';
import { useMemo } from 'react';
import useWebSocket from 'react-use-websocket';

const WebsocketConnector = () => {
  const exchange = useVault((state) => state.terminal.exchange);
  const ticker = useVault((state) => state.terminal.ticker);
  const apiKey = useVault((state) => state.terminal.selectedKey.apiKey);
  const apiSecret = useVault((state) => state.terminal.selectedKey.apiSecret);
  const setWsUrl = useVault((state) => state.setWsUrl);

  switch (exchange) {
    case 'bitmex': {
      const bitmexClient = BitMEXClient.getInstance();

      const wsUrl = useMemo(() => {
        let WS_URL: string;

        if (apiKey && apiSecret) {
          WS_URL = bitmexClient.getUrl(apiKey, apiSecret);
        } else {
          WS_URL = bitmexClient.getUrl();
        }

        setWsUrl(WS_URL);
        return WS_URL;
      }, [apiKey, apiSecret, setWsUrl, bitmexClient.getUrl]);

      const { sendJsonMessage } = useWebSocket(wsUrl, {
        share: true,
        filter: () => false,
        shouldReconnect: (closeEvent) => true,
        retryOnError: true,
        onOpen: (message) => {
          sendJsonMessage({
            op: 'subscribe',
            args: [
              `orderBookL2:${ticker}`,
              `trade:${ticker}`,
              `instrument:${ticker}`,
            ],
          });
        },
      });
    }
  }

  return <></>;
};

export default WebsocketConnector;
