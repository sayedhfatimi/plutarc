import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TPosition } from '@/lib/types/BitmexDataTypes';
import { useEffect } from 'react';

const BitMEXPositions = () => {
  const { data, sendJsonMessage } = useBitmexWs<TPosition>('position');

  useEffect(() => {
    sendJsonMessage({
      op: 'subscribe',
      args: ['psoition'],
    });

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: ['position'],
      });
    };
  }, [sendJsonMessage]);

  return <></>;
};

export default BitMEXPositions;
