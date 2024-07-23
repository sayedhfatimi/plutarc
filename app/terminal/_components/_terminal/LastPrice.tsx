import Spinner from '@/components/Spinner';
import { useAppSelector } from '@/lib/redux/hooks';
import { Instrument } from '@/lib/types/BitmexDataTypes';
import { bitmexDeltaParser, cn, numberParser } from '@/lib/utils';
import classNames from 'classnames';
import React, { useState } from 'react';
import { LuArrowDown, LuArrowUp, LuMinus } from 'react-icons/lu';
import useWebSocket from 'react-use-websocket';

const LastPrice = React.forwardRef<
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
    const [data, setData] = useState([] as Instrument[]);
    const selectedTicker = useAppSelector(
      (state) => state.userContext.selectedTicker,
    );

    useWebSocket(
      `wss://ws.bitmex.com/realtime?subscribe=orderBookL2:${selectedTicker},trade:${selectedTicker},instrument:${selectedTicker}`,
      {
        filter: (message) => {
          if (
            message.data !== 'pong' &&
            JSON.parse(message.data).table === 'instrument'
          ) {
            return true;
          } else {
            return false;
          }
        },
        shouldReconnect: (closeEvent) => true,
        retryOnError: true,
        share: true,
        onMessage: (message) =>
          bitmexDeltaParser<Instrument>(
            JSON.parse(message.data),
            data,
            setData,
            'instrument',
          ),
      },
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
          <div className='flex h-full flex-col place-content-center place-items-center p-2'>
            <div className='text-muted-foreground'>Last Price</div>
            <div className='flex flex-row items-center space-x-2'>
              <div
                className={classNames({
                  'text-green-600 dark:text-green-600':
                    data[0].lastTickDirection === 'PlusTick',
                  'text-red-600 dark:text-red-600':
                    data[0].lastTickDirection === 'MinusTick',
                })}
              >
                {data[0].lastTickDirection === 'PlusTick' ? (
                  <LuArrowUp size='24' />
                ) : data[0].lastTickDirection === 'MinusTick' ? (
                  <LuArrowDown size='24' />
                ) : (
                  <LuMinus size='24' />
                )}
              </div>
              <div
                className={classNames({
                  'text-4xl': true,
                  'text-green-600 dark:text-green-600':
                    data[0].lastTickDirection === 'PlusTick',
                  'text-red-600 dark:text-red-600':
                    data[0].lastTickDirection === 'MinusTick',
                })}
              >
                {numberParser(parseFloat(data[0].lastPrice))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

LastPrice.displayName = 'LastPrice';

export default LastPrice;
