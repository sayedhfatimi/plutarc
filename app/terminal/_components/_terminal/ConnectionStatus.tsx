'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import ConnectionStatusLabel from './ConnectionStatusLabel';

const ConnectionStatus = () => {
  const exchange = useAppSelector(
    (state) => state.userContext.terminal.exchange,
  );
  const WS_STATE = 1; // TODO: get websocket state

  switch (exchange) {
    case 'bitmex': {
      return <ConnectionStatusLabel state={WS_STATE} />;
    }
  }
};

export default ConnectionStatus;
