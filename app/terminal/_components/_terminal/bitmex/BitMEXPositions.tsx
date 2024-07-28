import { TABLE_NAME_POSITION } from '@/lib/consts/terminal/bitmex';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TPosition } from '@/lib/types/BitmexDataTypes';
import { useEffect } from 'react';

const BitMEXPositions = () => {
  const { data, sendJsonMessage } = useBitmexWs<TPosition>(TABLE_NAME_POSITION);

  useEffect(() => {
    sendJsonMessage({
      op: 'subscribe',
      args: [TABLE_NAME_POSITION],
    });

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_POSITION],
      });
    };
  }, [sendJsonMessage]);

  return <></>;
};

export default BitMEXPositions;
