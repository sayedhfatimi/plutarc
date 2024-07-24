'use client';
import Spinner from '@/components/Spinner';
import {
  gridComponentMargin,
  gridRowHeight,
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
    const terminalLayout = useAppSelector(
      (state) => state.userContext.terminalLayout,
    );
    const itemw = terminalLayout.filter((item) => item.i === 'Orderbook')[0].w;
    const itemh = terminalLayout.filter((item) => item.i === 'Orderbook')[0].h;

    const { data } = useBitmexWs<orderBookL2>('orderBookL2');

    const gridBreak = 6;

    let n = (gridRowHeight * itemh + gridComponentMargin[0] * (itemh - 1)) / 16;

    if (itemw < gridBreak) n = n / 2 + 1;

    let bidTotal: number = 0;
    let askTotal: number = 0;

    const bids = data
      .filter((item: orderBookL2) => item.side === 'Buy')
      .sort((a: orderBookL2, b: orderBookL2) => b.price - a.price)
      .slice(0, n - 2);

    const asks = data
      .filter((item: orderBookL2) => item.side === 'Sell')
      .sort((a: orderBookL2, b: orderBookL2) => a.price - b.price)
      .slice(0, n - 2);

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
              'flex overflow-clip font-mono text-xs font-thin': true,
              'flex-row items-start justify-evenly': itemw >= gridBreak,
              'flex-col-reverse justify-end': itemw < gridBreak,
            })}
          >
            <table
              className={classNames({
                'w-full table-auto border-collapse': true,
                'text-right [direction:rtl]': itemw >= gridBreak,
                'text-left': itemw < gridBreak,
              })}
              cellSpacing='0'
            >
              <thead
                className={classNames({
                  'text-slate-600': true,
                  hidden: itemw < gridBreak,
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
                        'text-right': itemw < gridBreak,
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
                      'text-right': itemw < gridBreak,
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
                        'text-right': itemw < gridBreak,
                      })}
                    >
                      {numberParser(item.price)}
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
