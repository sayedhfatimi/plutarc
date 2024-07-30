import Spinner from '@/components/Spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { TABLE_NAME_RECENTTRADES } from '@/lib/consts/terminal/bitmex';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import { useAppSelector } from '@/lib/redux/hooks';
import type { TRecentTrades } from '@/lib/types/bitmex/TRecentTrades';
import { numberParser } from '@/lib/utils';
import classNames from 'classnames';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { LuArrowUpDown, LuClock } from 'react-icons/lu';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';

const BitMEXRecentTrades = () => {
  const MAX_VISIBLE_TRADES = 100;

  const [subscribed, setSubscribed] = useState(false);
  const ticker = useAppSelector((state) => state.userContext.terminal.ticker);

  const { data, sendJsonMessage } = useBitmexWs<TRecentTrades>(
    TABLE_NAME_RECENTTRADES,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: unnecessary rerender
  useEffect(() => {
    if (subscribed)
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_RECENTTRADES],
      });
    sendJsonMessage({
      op: 'subscribe',
      args: [`${TABLE_NAME_RECENTTRADES}:${ticker}`],
    });
    setSubscribed(true);

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_RECENTTRADES],
      });
      setSubscribed(false);
    };
  }, [ticker, sendJsonMessage]);

  const filteredData = data.toReversed().slice(0, MAX_VISIBLE_TRADES);

  return (
    <>
      {!data || data.length === 0 ? (
        <div className='h-full place-content-center place-items-center text-center'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='grid w-full grid-cols-8 items-center border-b bg-white text-slate-600 dark:bg-slate-900'>
            <div className='flex '>Side</div>
            <div className='col-span-2 flex justify-end'>Size</div>
            <div className='col-span-3 flex flex-row items-center justify-end space-x-2'>
              <span>Price</span>
              <LuArrowUpDown />
            </div>
            <div className='col-span-2 flex justify-end'>
              <LuClock />
            </div>
          </div>
          <ScrollArea className='mb-2 h-full'>
            <div className='flex flex-col'>
              {filteredData.map((item: TRecentTrades) => (
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
                  <div className='flex'>{item.side}</div>
                  <div className='col-span-2 flex justify-end'>
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
                  <div className='col-span-2 flex justify-end text-slate-600'>
                    {new Date(item.timestamp).toLocaleTimeString()}
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
