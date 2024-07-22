'use client';
import Spinner from '@/components/Spinner';
import {
  gridComponentMargin,
  GridItem_Orderbook,
  gridRowHeight,
} from '@/lib/consts/terminal/config';
import type {
  BitmexWebSocketResponse,
  orderBookL2,
} from '@/lib/types/BitmexDataTypes';
import { bitmexDeltaParser, cn, numberParser } from '@/lib/utils';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const Orderbook = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      children,
      ...props
    },
    ref,
  ) => {
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

    let n =
      (gridRowHeight * GridItem_Orderbook.h +
        gridComponentMargin[0] * (GridItem_Orderbook.h - 1)) /
      16;

    const gridBreak = 6;

    if (GridItem_Orderbook.w < gridBreak) n = n / 2;

    let bidTotal: number = 0;
    let askTotal: number = 0;

    const bids = data
      .filter((item: orderBookL2) => item.side === 'Buy')
      .sort((a: orderBookL2, b: orderBookL2) => b.price - a.price)
      .slice(0, n - 1);

    const asks = data
      .filter((item: orderBookL2) => item.side === 'Sell')
      .sort((a: orderBookL2, b: orderBookL2) => a.price - b.price)
      .slice(0, n - 1);

    const bidSizeTotal: number = bids.reduce(
      (acc: number, val: orderBookL2) => acc + val.size,
      0,
    );

    const askSizeTotal: number = asks.reduce(
      (acc: number, val: orderBookL2) => acc + val.size,
      0,
    );

    return (
      <div
        style={{ ...style }}
        className={cn(
          classNames({
            'flex overflow-clip font-mono text-xs font-thin': true,
            'flex-row items-start justify-evenly':
              GridItem_Orderbook.w >= gridBreak,
            'flex-col-reverse justify-end': GridItem_Orderbook.w < gridBreak,
          }),
          className,
        )}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        <table
          className={classNames({
            'w-full table-auto border-collapse': true,
            'text-right [direction:rtl]': GridItem_Orderbook.w >= gridBreak,
            'text-left': GridItem_Orderbook.w < gridBreak,
          })}
          cellSpacing='0'
        >
          <thead
            className={classNames({
              'text-slate-600': true,
              hidden: GridItem_Orderbook.w < gridBreak,
            })}
          >
            <tr className='h-4 leading-none'>
              <th className='w-1/3'>Bid</th>
              <th className='w-1/3'>Size</th>
              <th className='w-1/3'>Price</th>
            </tr>
          </thead>
          <tbody className='box-border'>
            {bids.map((item: orderBookL2) => (
              <tr
                key={item.id}
                className='h-4 leading-none hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
              >
                <td className='w-1/3'>
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
                <td className='w-1/3 text-green-400 dark:text-green-600'>
                  {item.size.toLocaleString()}
                </td>
                <td
                  className={classNames({
                    'w-1/3 text-green-400 dark:text-green-600': true,
                    'text-right': GridItem_Orderbook.w < gridBreak,
                  })}
                >
                  {numberParser(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table
          className='w-full table-auto border-collapse text-left'
          cellSpacing='0'
        >
          <thead className='text-slate-600'>
            <tr className='h-4 leading-none'>
              <th className='w-1/3'>Ask</th>
              <th className='w-1/3'>Size</th>
              <th
                className={classNames({
                  'w-1/3': true,
                  'text-right': GridItem_Orderbook.w < gridBreak,
                })}
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody className='box-border'>
            {asks.map((item: orderBookL2) => (
              <tr
                key={item.id}
                className='h-4 leading-none hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
              >
                <td className='w-1/3'>
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
                <td className='w-1/3 text-red-400 dark:text-red-600'>
                  {item.size.toLocaleString()}
                </td>
                <td
                  className={classNames({
                    'w-1/3 text-red-400 dark:text-red-600': true,
                    'text-right': GridItem_Orderbook.w < gridBreak,
                  })}
                >
                  {numberParser(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {children}
      </div>
    );
  },
);

Orderbook.displayName = 'Orderbook';

export default Orderbook;
