'use client';
// biome-ignore lint/style/useNodejsImportProtocol: importing browserified crypto
import { createHmac } from 'crypto';
import { useVault } from '@/Providers/VaultProvider';
import bitmexClient from '@/lib/utils/clients/bitmex';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const WebsocketConnector = () => {
  const exchange = useVault((state) => state.terminal.exchange);
  const ticker = useVault((state) => state.terminal.ticker);
  const key = useVault((state) => state.terminal.selectedKey.apiKey);
  const secret = useVault((state) => state.terminal.selectedKey.apiSecret);
  const wsUrl = useVault((state) => state.terminal.wsUrl);
  const setWsUrl = useVault((state) => state.setWsUrl);

  switch (exchange) {
    case 'bitmex': {
      setWsUrl(bitmexClient.WS_URL);
      const { sendJsonMessage } = useWebSocket(wsUrl, {
        share: true,
        filter: () => false,
        shouldReconnect: () => true,
        retryOnError: true,
        onOpen: () => {
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

      useEffect(() => {
        if (key && secret) {
          const verb = 'GET';
          const path = '/realtime';
          const authObj = bitmexClient.getAuthObj(key, secret, verb, path);

          sendJsonMessage({
            op: 'authKey',
            args: [key, authObj['api-expires'], authObj['api-signature']],
          });
        }
      }, [key, secret, sendJsonMessage]);
    }
  }

  return <></>;
};

export default WebsocketConnector;
