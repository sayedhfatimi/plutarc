'use client';
import Spinner from '@/components/Spinner';
import {
  GRID_COMPONENT_MARGIN,
  GRID_ROW_HEIGHT,
} from '@/lib/consts/terminal/config';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import { useAppSelector } from '@/lib/redux/hooks';
import type { orderBookL2 } from '@/lib/types/BitmexDataTypes';
import { cn, numberParser } from '@/lib/utils';
import classNames from 'classnames';
import React from 'react';

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
    const ORDERBOOK_LEVEL_ROW_H = 16;
    const GRID_BREAK_W = 6;
    let BID_LEVEL_TOTAL = 0;
    let ASK_LEVEL_TOTAL = 0;

    const terminalLayout = useAppSelector(
      (state) => state.userContext.terminalLayout,
    );
    const COMPONENT_W = terminalLayout.filter(
      (item) => item.i === 'Orderbook',
    )[0].w;
    const COMPONENT_H = terminalLayout.filter(
      (item) => item.i === 'Orderbook',
    )[0].h;

    let n =
      (GRID_ROW_HEIGHT * COMPONENT_H +
        GRID_COMPONENT_MARGIN[0] * (COMPONENT_H - 1)) /
      ORDERBOOK_LEVEL_ROW_H;

    if (COMPONENT_W < GRID_BREAK_W) n = n / 2 + 1;

    const { data } = useBitmexWs<orderBookL2>('orderBookL2');

    const bids = data
      .filter((item: orderBookL2) => item.side === 'Buy')
      .sort((a: orderBookL2, b: orderBookL2) => b.price - a.price)
      .slice(0, n - 2);

    const asks = data
      .filter((item: orderBookL2) => item.side === 'Sell')
      .sort((a: orderBookL2, b: orderBookL2) => a.price - b.price)
      .slice(0, n - 2);

    const BID_SIZE_TOTAL: number = bids.reduce(
      (acc: number, val: orderBookL2) => acc + val.size,
      0,
    );

    const ASK_SIZE_TOTAL: number = asks.reduce(
      (acc: number, val: orderBookL2) => acc + val.size,
      0,
    );

    return (
      <div
        style={{ ...style }}
        className={cn('font-mono text-xs', className)}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        {children}

        {!data || data.length === 0 ? (
          <div className='h-full place-content-center place-items-center text-center'>
            <Spinner />
          </div>
        ) : (
          <div
            className={classNames({
              'flex overflow-clip font-mono font-thin text-xs': true,
              'flex-row items-start justify-evenly':
                COMPONENT_W >= GRID_BREAK_W,
              'flex-col-reverse justify-end': COMPONENT_W < GRID_BREAK_W,
            })}
          >
            <table
              className={classNames({
                'w-1/2 table-fixed border-collapse': true,
                'text-right [direction:rtl]': COMPONENT_W >= GRID_BREAK_W,
                'text-left': COMPONENT_W < GRID_BREAK_W,
              })}
              cellSpacing='0'
            >
              <thead
                className={classNames({
                  'text-slate-600': true,
                  hidden: COMPONENT_W < GRID_BREAK_W,
                })}
              >
                <tr className='h-4 leading-none'>
                  <th className='w-1/3'>Bid</th>
                  <th className='w-1/3'>Size</th>
                  <th className='w-1/3'>Price</th>
                </tr>
              </thead>
              <tbody className='box-border'>
                {bids.map((level: orderBookL2) => (
                  <tr
                    key={level.id}
                    className='h-4 leading-none hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
                  >
                    <td className='w-1/3'>
                      <div
                        className='whitespace-nowrap'
                        style={{
                          backgroundColor: '#22c55e',
                          width: `${(BID_LEVEL_TOTAL / BID_SIZE_TOTAL) * 100}%`,
                          maxWidth: '150%',
                        }}
                      >
                        <span>
                          {(BID_LEVEL_TOTAL += level.size).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className='w-1/3 text-green-400 dark:text-green-600'>
                      {level.size.toLocaleString()}
                    </td>
                    <td
                      className={classNames({
                        'w-1/3 text-green-400 dark:text-green-600': true,
                        'text-right': COMPONENT_W < GRID_BREAK_W,
                      })}
                    >
                      {numberParser(level.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table
              className='w-1/2 table-fixed border-collapse text-left'
              cellSpacing='0'
            >
              <thead className='text-slate-600'>
                <tr className='h-4 leading-none'>
                  <th className='w-1/3'>Ask</th>
                  <th className='w-1/3'>Size</th>
                  <th
                    className={classNames({
                      'w-1/3': true,
                      'text-right': COMPONENT_W < GRID_BREAK_W,
                    })}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className='box-border'>
                {asks.map((level: orderBookL2) => (
                  <tr
                    key={level.id}
                    className='h-4 leading-none hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
                  >
                    <td className='w-1/3'>
                      <div
                        className='whitespace-nowrap'
                        style={{
                          backgroundColor: '#dc2626',
                          width: `${(ASK_LEVEL_TOTAL / ASK_SIZE_TOTAL) * 100}%`,
                          maxWidth: '150%',
                        }}
                      >
                        <span>
                          {(ASK_LEVEL_TOTAL += level.size).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className='w-1/3 text-red-400 dark:text-red-600'>
                      {level.size.toLocaleString()}
                    </td>
                    <td
                      className={classNames({
                        'w-1/3 text-red-400 dark:text-red-600': true,
                        'text-right': COMPONENT_W < GRID_BREAK_W,
                      })}
                    >
                      {numberParser(level.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  },
);

Orderbook.displayName = 'Orderbook';

export default Orderbook;
