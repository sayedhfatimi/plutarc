import Spinner from '@/components/Spinner';
import { ICON_SIZE_MEDIUM } from '@/lib/consts/UI';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import { useAppSelector } from '@/lib/redux/hooks';
import type { TInstrument } from '@/lib/types/BitmexDataTypes';
import { numberParser } from '@/lib/utils';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { LuArrowDown, LuArrowUp, LuCircle } from 'react-icons/lu';

const BitMEXLastPrice = () => {
  const [subscribed, setSubscribed] = useState(false);
  const selectedTicker = useAppSelector(
    (state) => state.userContext.selectedTicker,
  );

  const { data, sendJsonMessage } = useBitmexWs<TInstrument>('instrument');

  // biome-ignore lint/correctness/useExhaustiveDependencies: unnecessary rerender
  useEffect(() => {
    if (subscribed)
      sendJsonMessage({
        op: 'unsubscribe',
        args: ['instrument'],
      });
    sendJsonMessage({
      op: 'subscribe',
      args: [`instrument:${selectedTicker}`],
    });
    setSubscribed(true);

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: ['instrument'],
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
                <LuArrowUp size={ICON_SIZE_MEDIUM} />
              ) : data[0].lastTickDirection === 'MinusTick' ? (
                <LuArrowDown size={ICON_SIZE_MEDIUM} />
              ) : (
                <LuCircle size={ICON_SIZE_MEDIUM} />
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
              {numberParser(data[0].lastPrice)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BitMEXLastPrice;
