'use client';
import { setWsUrl } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import BitMEXClient from '@/lib/utils/clients/bitmex';
import { useMemo } from 'react';
import useWebSocket from 'react-use-websocket';

const WebsocketConnector = () => {
  const exchange = useAppSelector(
    (state) => state.userContext.terminal.exchange,
  );
  const ticker = useAppSelector((state) => state.userContext.terminal.ticker);
  const apiKey = useAppSelector((state) => state.userContext.APIKey.apiKey);
  const apiSecret = useAppSelector(
    (state) => state.userContext.APIKey.apiSecret,
  );
  const dispatch = useAppDispatch();

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

        dispatch(setWsUrl(WS_URL));
        return WS_URL;
      }, [apiKey, apiSecret, dispatch, bitmexClient.getUrl]);

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
