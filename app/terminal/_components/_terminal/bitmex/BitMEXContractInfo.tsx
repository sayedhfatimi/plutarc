import Spinner from '@/components/Spinner';
import { TABLE_NAME_INSTRUMENT } from '@/lib/consts/terminal/bitmex';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import { useAppSelector } from '@/lib/redux/hooks';
import type { TInstrument } from '@/lib/types/bitmex/TInstrument';
import { numberParser } from '@/lib/utils';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const BitMEXContractInfo = () => {
  const FUNDING_THRESHOLD_SAFE = 0.0002;
  const FUNDING_THRESHOLD_CAUTION = 0.0002;
  const FUNDING_THRESHOLD_DANGER = 0.0003;

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

  return (
    <>
      {!data || data.length === 0 ? (
        <div className='h-full place-content-center place-items-center text-center'>
          <Spinner />
        </div>
      ) : (
        <div className='group flex h-full items-center justify-evenly'>
          <div className='flex flex-row space-x-2 group-hover:hidden'>
            <div className='flex w-[96px] flex-col text-right'>
              <div>Mark Price</div>
              <div>Funding</div>
              <div>O. Interest</div>
              <div>24h Volume</div>
            </div>
            <div className='flex flex-col'>
              <div>{`${numberParser(data[0].markPrice)} ${data[0].quoteCurrency}`}</div>
              <div
                className={classNames({
                  'text-red-800':
                    data[0].fundingRate > FUNDING_THRESHOLD_DANGER,
                  'text-red-600':
                    data[0].fundingRate > FUNDING_THRESHOLD_CAUTION,
                  'text-green-600':
                    data[0].fundingRate < FUNDING_THRESHOLD_SAFE,
                })}
              >
                {`${(data[0].fundingRate * 100).toFixed(4)}%`}
              </div>
              <div>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  notation: 'compact',
                }).format(data[0].openInterest)}
              </div>
              <div>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  notation: 'compact',
                }).format(data[0].volume24h)}
              </div>
            </div>
          </div>
          <div className='hidden flex-row space-x-2 group-hover:flex'>
            <div className='flex w-[96px] flex-col text-right'>
              <div>Index Price</div>
              <div>P. Funding</div>
              <div>O. Value</div>
              <div>24h Turnover</div>
            </div>
            <div className='flex flex-col'>
              <div>{`${numberParser(data[0].indicativeSettlePrice)} ${data[0].quoteCurrency}`}</div>
              <div
                className={classNames({
                  'text-red-800':
                    data[0].fundingRate > FUNDING_THRESHOLD_DANGER,
                  'text-red-600':
                    data[0].fundingRate > FUNDING_THRESHOLD_CAUTION,
                  'text-green-600':
                    data[0].fundingRate < FUNDING_THRESHOLD_SAFE,
                })}
              >{`${(data[0].indicativeFundingRate * 100).toFixed(4)}%`}</div>
              <div>{`${numberParser(data[0].openValue / 10 ** 8)} ${data[0].rootSymbol}`}</div>
              <div>{`${numberParser(data[0].turnover24h / 10 ** 8)} ${data[0].rootSymbol}`}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BitMEXContractInfo;
