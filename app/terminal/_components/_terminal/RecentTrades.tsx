'use client';
import Spinner from '@/components/Spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import type {
  BitmexWebSocketResponse,
  RecentTrades,
} from '@/lib/types/BitmexDataTypes';
import { bitmexDeltaParser, cn, numberParser } from '@/lib/utils';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { LuArrowUpDown, LuClock, LuFish } from 'react-icons/lu';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';
import useWebSocket from 'react-use-websocket';

const RecentTrades = React.forwardRef<
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
    const [data, setData] = useState([] as RecentTrades[]);

    const {
      lastJsonMessage,
    }: { lastJsonMessage: BitmexWebSocketResponse<RecentTrades> } =
      useWebSocket('wss://ws.bitmex.com/realtime?subscribe=trade:XBTUSD', {
        filter: (message) => {
          if (
            message.data !== 'pong' &&
            JSON.parse(message.data).table === 'trade'
          ) {
            return true;
          } else {
            return false;
          }
        },
        share: true,
      });

    useEffect(() => {
      bitmexDeltaParser<RecentTrades>(
        lastJsonMessage,
        data,
        setData,
        'trade',
        100,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastJsonMessage]);

    if (!data || data.length === 0)
      return (
        <div className='h-full place-content-center place-items-center text-center'>
          <Spinner />
        </div>
      );

    return (
      <div
        style={{ ...style }}
        className={cn('overflow-hidden font-mono text-xs', className)}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        <div className='grid w-full grid-cols-8 items-center border-b bg-white text-slate-600 dark:bg-slate-900'>
          <div className='col-span-2 flex'>
            <LuFish />
          </div>
          <div className='flex'>Side</div>
          <div className='flex justify-end'>Size</div>
          <div className='col-span-3 flex flex-row items-center justify-end space-x-2'>
            <span>Price</span>
            <LuArrowUpDown />
          </div>
          <div className='flex justify-end'>
            <LuClock />
          </div>
        </div>
        <ScrollArea className='h-full'>
          <div className='flex flex-col-reverse'>
            {data.map((item: RecentTrades) => (
              <div
                key={item.trdMatchID}
                className={classNames({
                  'grid grid-cols-8 hover:bg-slate-200/50 dark:hover:bg-slate-200/50':
                    true,
                  'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-600':
                    item.side === 'Buy',
                  'bg-red-50 text-red-400 dark:bg-red-950/20 dark:text-red-600':
                    item.side === 'Sell',
                })}
              >
                <div className='col-span-2 flex'>{item.symbol}</div>
                <div className='flex'>{item.side}</div>
                <div className='flex justify-end'>
                  {item.size.toLocaleString()}
                </div>
                <div className='col-span-3 flex flex-row items-center justify-end space-x-2'>
                  {item.tickDirection === 'PlusTick' ? (
                    <TiArrowUp size='16' />
                  ) : item.tickDirection === 'MinusTick' ? (
                    <TiArrowDown size='16' />
                  ) : null}
                  <span>{numberParser(item.price)}</span>
                </div>
                <div className='flex justify-end text-slate-600'>
                  {(
                    (Date.now() - Date.parse(item.timestamp)) /
                    1000
                  ).toLocaleString(undefined, {
                    maximumSignificantDigits: 3,
                  }) + 's'}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {children}
      </div>
    );
  },
);

RecentTrades.displayName = 'RecentTrades';

export default RecentTrades;
