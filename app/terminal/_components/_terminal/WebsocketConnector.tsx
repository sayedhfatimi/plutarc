'use client';
// biome-ignore lint/style/useNodejsImportProtocol: importing browserified crypto
import { createHmac } from 'crypto';
import { useVault } from '@/Providers/VaultProvider';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const WebsocketConnector = () => {
  const exchange = useVault((state) => state.terminal.exchange);
  const ticker = useVault((state) => state.terminal.ticker);
  const key = useVault((state) => state.terminal.selectedKey.apiKey);
  const secret = useVault((state) => state.terminal.selectedKey.apiSecret);

  switch (exchange) {
    case 'bitmex': {
      const { sendJsonMessage } = useWebSocket('wss://ws.bitmex.com/realtime', {
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
          const expires = Math.round(new Date().getTime() / 1000) + 60;

          const signature = createHmac('sha256', secret)
            .update(verb + path + expires)
            .digest('hex');

          sendJsonMessage({
            op: 'authKeyExpires',
            args: [key, expires, signature],
          });
        }
      }, [key, secret, sendJsonMessage]);
    }
  }

  return <></>;
};

export default WebsocketConnector;
