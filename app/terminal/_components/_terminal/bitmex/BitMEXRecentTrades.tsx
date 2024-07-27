import Spinner from '@/components/Spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import { useAppSelector } from '@/lib/redux/hooks';
import type { TRecentTrades } from '@/lib/types/BitmexDataTypes';
import { numberParser } from '@/lib/utils';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { LuArrowUpDown, LuClock, LuFish } from 'react-icons/lu';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';

const BitMEXRecentTrades = () => {
  const DATE_MAXIMUM_SIGNIFICANT_DIGITS = 3;

  const [subscribed, setSubscribed] = useState(false);
  const selectedTicker = useAppSelector(
    (state) => state.userContext.selectedTicker,
  );

  const { data, sendJsonMessage } = useBitmexWs<TRecentTrades>('trade');

  // biome-ignore lint/correctness/useExhaustiveDependencies: unnecessary rerender
  useEffect(() => {
    if (subscribed)
      sendJsonMessage({
        op: 'unsubscribe',
        args: ['trade'],
      });
    sendJsonMessage({
      op: 'subscribe',
      args: [`trade:${selectedTicker}`],
    });
    setSubscribed(true);

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: ['trade'],
      });
      setSubscribed(false);
    };
  }, [selectedTicker, sendJsonMessage]);

  return (
    <>
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
              {data.map((item: TRecentTrades) => (
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
                    {`${(
                      (Date.now() - Date.parse(item.timestamp)) /
                      1000
                    ).toLocaleString(undefined, {
                      maximumSignificantDigits: DATE_MAXIMUM_SIGNIFICANT_DIGITS,
                    })}s`}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </>
  );
};

export default BitMEXRecentTrades;
