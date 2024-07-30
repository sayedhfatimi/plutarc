import Spinner from '@/components/Spinner';
import { ICON_SIZE_MEDIUM } from '@/lib/consts/UI';
import { TABLE_NAME_INSTRUMENT } from '@/lib/consts/terminal/bitmex';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import { useAppSelector } from '@/lib/redux/hooks';
import type { TInstrument } from '@/lib/types/bitmex/TInstrument';
import { numberParser } from '@/lib/utils';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { LuArrowDown, LuArrowUp, LuMinus } from 'react-icons/lu';

const BitMEXTickerStrip = () => {
  const [subscribed, setSubscribed] = useState(false);
  const ticker = useAppSelector((state) => state.userContext.terminal.ticker);

  const { data, sendJsonMessage } = useBitmexWs<TInstrument>(
    TABLE_NAME_INSTRUMENT,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: unnecessary rerender
  useEffect(() => {
    if (subscribed)
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_INSTRUMENT],
      });
    sendJsonMessage({
      op: 'subscribe',
      args: [`${TABLE_NAME_INSTRUMENT}:${ticker}`],
    });
    setSubscribed(true);

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_INSTRUMENT],
      });
      setSubscribed(false);
    };
  }, [ticker, sendJsonMessage]);

  if (!data || data.length === 0)
    return (
      <div className='h-full place-content-center place-items-center text-center'>
        <Spinner />
      </div>
    );

  return (
    <>
      {data.map((ticker) => (
        <div
          key={ticker.symbol}
          className='flex select-none flex-row items-center space-x-2 divide-x-2 font-mono'
        >
          <div className='flex flex-row items-center space-x-2'>
            <div
              className={classNames({
                'text-green-600 dark:text-green-600':
                  ticker.lastTickDirection === 'PlusTick',
                'text-red-600 dark:text-red-600':
                  ticker.lastTickDirection === 'MinusTick',
              })}
            >
              {ticker.lastTickDirection === 'PlusTick' ? (
                <LuArrowUp size={ICON_SIZE_MEDIUM} />
              ) : ticker.lastTickDirection === 'MinusTick' ? (
                <LuArrowDown size={ICON_SIZE_MEDIUM} />
              ) : (
                <LuMinus size={ICON_SIZE_MEDIUM} />
              )}
            </div>
            <div className='flex flex-col'>
              <div className='text-right text-muted-foreground text-xs'>
                Last Price
              </div>
              <div
                className={classNames({
                  'text-green-600 dark:text-green-600':
                    ticker.lastTickDirection === 'PlusTick',
                  'text-red-600 dark:text-red-600':
                    ticker.lastTickDirection === 'MinusTick',
                })}
              >
                {numberParser(ticker.lastPrice)}
              </div>
            </div>
          </div>
          <div className='hidden flex-col px-2 xl:flex'>
            <div className='text-right text-muted-foreground text-xs'>
              24h %
            </div>
            <div
              className={classNames({
                'text-green-600 dark:text-green-600': ticker.lastChangePcnt > 0,
                'text-red-600 dark:text-red-600': ticker.lastChangePcnt < 0,
              })}
            >
              {`${ticker.lastChangePcnt > 0 ? '+' : ''}${numberParser(ticker.lastChangePcnt * 100)} %`}
            </div>
          </div>
          <div className='hidden flex-col px-2 2xl:flex'>
            <div className='text-right text-muted-foreground text-xs'>High</div>
            <div>{numberParser(ticker.highPrice)}</div>
          </div>
          <div className='hidden flex-col px-2 2xl:flex'>
            <div className='text-right text-muted-foreground text-xs'>Low</div>
            <div>{numberParser(ticker.lowPrice)}</div>
          </div>
          <div className='hidden flex-col px-2 2xl:flex'>
            <div className='text-right text-muted-foreground text-xs'>VWAP</div>
            <div>{numberParser(ticker.vwap)}</div>
          </div>
          <div className='hidden flex-col px-2 xl:flex'>
            <div className='text-right text-muted-foreground text-xs'>
              24h Volume
            </div>
            <div className='text-right'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
              }).format(ticker.volume24h)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BitMEXTickerStrip;
