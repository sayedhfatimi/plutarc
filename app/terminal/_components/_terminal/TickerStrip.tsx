'use client';
import Spinner from '@/components/Spinner';
import useData from '@/lib/hooks/useData';
import type { Instrument } from '@/lib/types/BitmexDataTypes';
import { numberParser } from '@/lib/utils';
import classNames from 'classnames';
import { LuArrowDown, LuArrowUp, LuMinus } from 'react-icons/lu';

const TickerStrip = () => {
  const { data } = useData<Instrument>('instrument');

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
          className='flex flex-row items-center divide-x-2 font-mono'
        >
          <div className='flex flex-row items-center space-x-2 px-4'>
            <div
              className={classNames({
                'text-green-600 dark:text-green-600':
                  ticker.lastTickDirection === 'PlusTick',
                'text-red-600 dark:text-red-600':
                  ticker.lastTickDirection === 'MinusTick',
              })}
            >
              {ticker.lastTickDirection === 'PlusTick' ? (
                <LuArrowUp size='24' />
              ) : ticker.lastTickDirection === 'MinusTick' ? (
                <LuArrowDown size='24' />
              ) : (
                <LuMinus size='24' />
              )}
            </div>
            <div className='flex flex-col'>
              <div className='text-right text-xs text-muted-foreground'>
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
                {numberParser(parseFloat(ticker.lastPrice))}
              </div>
            </div>
          </div>
          <div className='flex flex-col px-4'>
            <div className='text-right text-xs text-muted-foreground'>
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
          <div className='flex flex-col px-4'>
            <div className='text-right text-xs text-muted-foreground'>High</div>
            <div>{numberParser(ticker.highPrice)}</div>
          </div>
          <div className='flex flex-col px-4'>
            <div className='text-right text-xs text-muted-foreground'>Low</div>
            <div>{numberParser(ticker.lowPrice)}</div>
          </div>
          <div className='flex flex-col px-4'>
            <div className='text-right text-xs text-muted-foreground'>VWAP</div>
            <div>{numberParser(ticker.vwap)}</div>
          </div>
          <div className='flex flex-col px-4'>
            <div className='text-right text-xs text-muted-foreground'>
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

export default TickerStrip;
