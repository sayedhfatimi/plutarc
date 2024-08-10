'use client';
import useWebSocket from 'react-use-websocket';
import ConnectionStatusLabel from './ConnectionStatusLabel';

const ConnectionStatus = () => {
  const { readyState } = useWebSocket('wss://ws.bitmex.com/realtime', {
    share: true,
    filter: () => false,
  });

  return <ConnectionStatusLabel state={readyState} />;
};

export default ConnectionStatus;
