'use client';
import Spinner from '@/components/Spinner';
import type { Instrument } from '@/lib/types/BitmexDataTypes';
import { bitmexDeltaParser } from '@/lib/utils';
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

const TickerList = () => {
  const [data, setData] = useState([] as Instrument[]);

  useWebSocket('wss://ws.bitmex.com/realtime?subscribe=instrument:CONTRACTS', {
    filter: (message) => {
      if (
        message.data !== 'pong' &&
        JSON.parse(message.data).table === 'instrument'
      ) {
        return true;
      } else {
        return false;
      }
    },
    share: true,
    onMessage: (message) =>
      bitmexDeltaParser<Instrument>(
        JSON.parse(message.data),
        data,
        setData,
        'instrument',
      ),
  });

  if (!data || data.length === 0)
    return (
      <div className='h-full place-content-center place-items-center text-center'>
        <Spinner />
      </div>
    );

  return <></>;
};

export default TickerList;
