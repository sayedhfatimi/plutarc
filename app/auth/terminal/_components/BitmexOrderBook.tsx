'use client';
import {
  deleteItem,
  initialiseState,
  insertItem,
  updateItems,
} from '@/lib/redux/features/bitmex/BitmexOrderbook';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { orderBookL2_25, orderBookL2_25_Data } from '@/types/bitmexTypes';
import { Grid } from '@radix-ui/themes';
import React from 'react';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const BitmexOrderbook = () => {
  const data = useAppSelector((state) => state.BitmexOrderbook);
  const selectedTicker = useAppSelector((state) => state.BitmexSelectedTicker);

  const dispatch = useAppDispatch();

  const { lastJsonMessage }: { lastJsonMessage: orderBookL2_25 } = useWebSocket(
    `wss://ws.bitmex.com/realtime`,
    {
      onOpen: () =>
        console.log(
          `Connected to BitMex WebSocket API, subscribed to orderBookL2_25:${selectedTicker}`,
        ),
      shouldReconnect: (closeEvent) => true,
      heartbeat: {
        message: 'ping',
        returnMessage: 'pong',
        timeout: 60 * 1000,
        interval: 30 * 1000,
      },
      queryParams: { subscribe: `orderBookL2_25:${selectedTicker}` },
    },
  );

  useEffect(() => {
    if (lastJsonMessage !== undefined)
      if (
        lastJsonMessage !== null &&
        lastJsonMessage.table === `orderBookL2_25`
      ) {
        switch (lastJsonMessage.action) {
          case 'partial': {
            dispatch(initialiseState(lastJsonMessage.data));
            break;
          }
          case 'insert': {
            dispatch(insertItem(lastJsonMessage.data));
            break;
          }
          case 'update': {
            dispatch(updateItems(lastJsonMessage.data));
            break;
          }
          case 'delete': {
            dispatch(deleteItem(lastJsonMessage.data));
            break;
          }
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  const bidSizeTotal: number = data
    .filter((item: orderBookL2_25_Data) => item.side === 'Buy')
    .slice(0, 10)
    .reduce((acc: any, val: orderBookL2_25_Data) => acc + val.size, 0);

  const askSizeTotal: number = data
    .filter((item: orderBookL2_25_Data) => item.side === 'Sell')
    .slice(0, 10)
    .reduce((acc: any, val: orderBookL2_25_Data) => acc + val.size, 0);

  let bidTotal: number = 0;
  let askTotal: number = 0;

  return (
    <>
      <Grid columns='2' gap='2' className='font-mono text-xs font-thin'>
        <table
          className='table-auto text-right'
          style={{ direction: 'rtl' }}
          cellSpacing='0'
        >
          <thead className='text-slate-600'>
            <tr>
              <th className='w-1/3'>Bid Total</th>
              <th className='w-1/3'>Size</th>
              <th className='w-1/3'>Price</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item: orderBookL2_25_Data) => item.side === 'Buy')
              .sort(
                (a: orderBookL2_25_Data, b: orderBookL2_25_Data) =>
                  b.price - a.price,
              )
              .slice(0, 10)
              .map((item: orderBookL2_25_Data) => (
                <tr
                  key={item.id}
                  className='hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
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
                    {item.price.toFixed(1)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <table className='table-auto text-left' cellSpacing='0'>
          <thead className='text-slate-600'>
            <tr>
              <th className='w-1/3'>Ask Total</th>
              <th className='w-1/3'>Size</th>
              <th className='w-1/3'>Price</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item: orderBookL2_25_Data) => item.side === 'Sell')
              .sort(
                (a: orderBookL2_25_Data, b: orderBookL2_25_Data) =>
                  a.price - b.price,
              )
              .slice(0, 10)
              .map((item: orderBookL2_25_Data) => (
                <tr
                  key={item.id}
                  className='hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
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
                    {item.price.toFixed(1)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Grid>
    </>
  );
};

export const MemoBitmexOrderbook = React.memo(BitmexOrderbook);
