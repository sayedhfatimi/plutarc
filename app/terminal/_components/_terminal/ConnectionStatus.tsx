'use client';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import { useAppSelector } from '@/lib/redux/hooks';
import ConnectionStatusLabel from './ConnectionStatusLabel';

const ConnectionStatus = () => {
  const exchange = useAppSelector(
    (state) => state.userContext.terminal.exchange,
  );

  switch (exchange) {
    case 'bitmex': {
      const { readyState } = useBitmexWs();

      return <ConnectionStatusLabel state={readyState} />;
    }
  }
};

export default ConnectionStatus;
