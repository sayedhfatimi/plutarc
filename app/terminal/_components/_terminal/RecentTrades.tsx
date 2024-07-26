'use client';
import Spinner from '@/components/Spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { RecentTrades } from '@/lib/types/BitmexDataTypes';
import { cn, numberParser } from '@/lib/utils';
import classNames from 'classnames';
import React from 'react';
import { LuArrowUpDown, LuClock, LuFish } from 'react-icons/lu';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';

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
    const DATE_MAXIMUM_SIGNIFICANT_DIGITS = 3;

    const { data } = useBitmexWs<RecentTrades>('trade');

    return (
      <div
        style={{ ...style }}
        className={cn('overflow-hidden pb-2 font-mono text-xs', className)}
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
          <>
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
                      'grid grid-cols-8 hover:bg-slate-200/50 dark:hover:bg-slate-200/50': true,
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
                        <TiArrowUp size={ICON_SIZE_SMALL} />
                      ) : item.tickDirection === 'MinusTick' ? (
                        <TiArrowDown size={ICON_SIZE_SMALL} />
                      ) : null}
                      <span>{numberParser(item.price)}</span>
                    </div>
                    <div className='flex justify-end text-slate-600'>
                      {(
                        (Date.now() - Date.parse(item.timestamp)) /
                        1000
                      ).toLocaleString(undefined, {
                        maximumSignificantDigits:
                          DATE_MAXIMUM_SIGNIFICANT_DIGITS,
                      }) + 's'}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    );
  },
);

RecentTrades.displayName = 'RecentTrades';

export default RecentTrades;
