'use client';
import { useVault } from '@/Providers/VaultProvider';
import useWebSocket from 'react-use-websocket';
import ConnectionStatusLabel from './ConnectionStatusLabel';

const ConnectionStatus = () => {
  const wsUrl = useVault((state) => state.terminal.wsUrl);

  const { readyState } = useWebSocket(wsUrl, {
    share: true,
    filter: () => false,
  });

  return <ConnectionStatusLabel state={readyState} />;
};

export default ConnectionStatus;
