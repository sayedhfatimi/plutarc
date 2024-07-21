'use client';
import Spinner from '@/components/Spinner';
import type {
  BitmexWebSocketResponse,
  orderBookL2,
} from '@/lib/types/BitmexDataTypes';
import { bitmexDeltaParser, cn, numberParser } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const Orderbook = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, forwardedRef) => {
  const [data, setData] = useState([] as orderBookL2[]);

  const {
    lastJsonMessage,
  }: { lastJsonMessage: BitmexWebSocketResponse<orderBookL2> } = useWebSocket(
    'wss://ws.bitmex.com/realtime?subscribe=orderBookL2:XBTUSD',
    {
      filter: (message) => {
        if (
          message.data !== 'pong' &&
          JSON.parse(message.data).table === 'orderBookL2'
        ) {
          return true;
        } else {
          return false;
        }
      },
      share: true,
    },
  );

  useEffect(() => {
    bitmexDeltaParser<orderBookL2>(
      lastJsonMessage,
      data,
      setData,
      'orderBookL2',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  if (!data || data.length === 0)
    return (
      <div className='h-full place-content-center place-items-center text-center'>
        <Spinner />
      </div>
    );

  // get total of size of bids from all bids in state
  const bidSizeTotal: number = data
    .filter((item: orderBookL2) => item.side === 'Buy')
    .slice(0, 25)
    .reduce((acc: any, val: orderBookL2) => acc + val.size, 0);

  // get total of size of asks from all asks in state
  const askSizeTotal: number = data
    .filter((item: orderBookL2) => item.side === 'Sell')
    .slice(0, 25)
    .reduce((acc: any, val: orderBookL2) => acc + val.size, 0);

  let bidTotal: number = 0;
  let askTotal: number = 0;

  return (
    <div
      className={cn('grid grid-cols-2 font-mono text-xs font-thin', className)}
      ref={forwardedRef}
      {...props}
    >
      <table
        className='text-right'
        style={{ direction: 'rtl' }}
        cellSpacing='0'
      >
        <thead className='text-slate-600'>
          <tr className='max-h-6 min-h-6'>
            <th className='w-1/3'>Bid</th>
            <th className='w-1/3'>Size</th>
            <th className='w-1/3'>Price</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item: orderBookL2) => item.side === 'Buy')
            .sort((a: orderBookL2, b: orderBookL2) => b.price - a.price)
            .slice(0, 25)
            .map((item: orderBookL2) => (
              <tr
                key={item.id}
                className='max-h-6 min-h-6 hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
              >
                <td>
                  <div
                    className='whitespace-nowrap'
                    style={{
                      backgroundColor: '#22c55e',
                      width: `${(bidTotal / bidSizeTotal) * 100}%`,
                      maxWidth: '150%',
                    }}
                  >
                    <span>{(bidTotal += item.size).toLocaleString()}</span>
                  </div>
                </td>
                <td className='text-green-400 dark:text-green-600'>
                  {item.size.toLocaleString()}
                </td>
                <td className='text-green-400 dark:text-green-600'>
                  {numberParser(item.price)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <table className='text-left' cellSpacing='0'>
        <thead className='text-slate-600'>
          <tr className='max-h-6 min-h-6'>
            <th className='w-1/3'>Ask</th>
            <th className='w-1/3'>Size</th>
            <th className='w-1/3'>Price</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item: orderBookL2) => item.side === 'Sell')
            .sort((a: orderBookL2, b: orderBookL2) => a.price - b.price)
            .slice(0, 25)
            .map((item: orderBookL2) => (
              <tr
                key={item.id}
                className='max-h-6 min-h-6 hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
              >
                <td>
                  <div
                    className='whitespace-nowrap'
                    style={{
                      backgroundColor: '#dc2626',
                      width: `${(askTotal / askSizeTotal) * 100}%`,
                      maxWidth: '150%',
                    }}
                  >
                    <span>{(askTotal += item.size).toLocaleString()}</span>
                  </div>
                </td>
                <td className='text-red-400 dark:text-red-600'>
                  {item.size.toLocaleString()}
                </td>
                <td className='text-red-400 dark:text-red-600'>
                  {numberParser(item.price)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
});

Orderbook.displayName = 'Orderbook';

export default Orderbook;
