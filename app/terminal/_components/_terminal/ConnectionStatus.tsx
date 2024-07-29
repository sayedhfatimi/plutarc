'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import useWebSocket from 'react-use-websocket';
import ConnectionStatusLabel from './ConnectionStatusLabel';

const ConnectionStatus = () => {
  const wsUrl = useAppSelector((state) => state.userContext.terminal.wsUrl);

  const { readyState } = useWebSocket(wsUrl, {
    share: true,
    filter: () => false,
  });

  return <ConnectionStatusLabel state={readyState} />;
};

export default ConnectionStatus;
