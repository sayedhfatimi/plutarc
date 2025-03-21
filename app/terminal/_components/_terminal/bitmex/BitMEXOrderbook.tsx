import { useVault } from '@/Providers/VaultProvider';
import Spinner from '@/components/Spinner';
import { TABLE_NAME_ORDERBOOK } from '@/lib/consts/terminal/bitmex';
import {
  GRID_COMPONENT_MARGIN,
  GRID_ROW_HEIGHT,
} from '@/lib/consts/terminal/gridConfig';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TorderBook } from '@/lib/types/bitmex/TorderBook';
import { numberParser } from '@/lib/utils';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const BitMEXOrderbook = () => {
  const ORDERBOOK_LEVEL_ROW_H = 16;
  const GRID_BREAK_W = 6;
  let BID_LEVEL_ACCUMULATOR = 0;
  let ASK_LEVEL_ACCUMULATOR = 0;

  const [subscribed, setSubscribed] = useState(false);
  const ticker = useVault((state) => state.terminal.ticker);
  const terminalLayout = useVault((state) => state.terminal.activeComponents);
  const COMPONENT_W = terminalLayout.filter((item) => item.i === 'Orderbook')[0]
    .w;
  const COMPONENT_H = terminalLayout.filter((item) => item.i === 'Orderbook')[0]
    .h;

  let n =
    (GRID_ROW_HEIGHT * COMPONENT_H +
      GRID_COMPONENT_MARGIN[0] * (COMPONENT_H - 1)) /
    ORDERBOOK_LEVEL_ROW_H;

  if (COMPONENT_W < GRID_BREAK_W) n = n / 2 + 1;

  const { data, sendJsonMessage } =
    useBitmexWs<TorderBook>(TABLE_NAME_ORDERBOOK);

  // biome-ignore lint/correctness/useExhaustiveDependencies: unnecessary rerender
  useEffect(() => {
    if (subscribed)
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_ORDERBOOK],
      });
    sendJsonMessage({
      op: 'subscribe',
      args: [`${TABLE_NAME_ORDERBOOK}:${ticker}`],
    });
    setSubscribed(true);

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_ORDERBOOK],
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

  const bids = data
    .filter((item: TorderBook) => item.side === 'Buy')
    .sort((a: TorderBook, b: TorderBook) => b.price - a.price)
    .slice(0, n - 2);

  const asks = data
    .filter((item: TorderBook) => item.side === 'Sell')
    .sort((a: TorderBook, b: TorderBook) => a.price - b.price)
    .slice(0, n - 2);

  const BID_SIZE_TOTAL: number = bids.reduce(
    (acc: number, val: TorderBook) => acc + val.size,
    0,
  );

  const ASK_SIZE_TOTAL: number = asks.reduce(
    (acc: number, val: TorderBook) => acc + val.size,
    0,
  );

  return (
    <div
      className={classNames({
        'flex overflow-clip font-mono font-thin text-xs': true,
        'flex-row items-start justify-evenly': COMPONENT_W >= GRID_BREAK_W,
        'flex-col-reverse justify-end': COMPONENT_W < GRID_BREAK_W,
      })}
    >
      <table
        className={classNames({
          'w-1/2 table-fixed border-collapse': true,
          'text-right [direction:rtl]': COMPONENT_W >= GRID_BREAK_W,
          'w-full text-left': COMPONENT_W < GRID_BREAK_W,
        })}
        cellSpacing='0'
      >
        <thead
          className={classNames({
            'text-slate-600': true,
            hidden: COMPONENT_W < GRID_BREAK_W,
          })}
        >
          <tr className='h-4 leading-none'>
            <th className='w-1/3'>Bid</th>
            <th className='w-1/3'>Size</th>
            <th className='w-1/3'>Price</th>
          </tr>
        </thead>
        <tbody className='box-border'>
          {bids.map((level: TorderBook) => (
            <tr
              key={level.id}
              className='h-4 leading-none hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
            >
              <td className='w-1/3'>
                <div
                  className='whitespace-nowrap'
                  style={{
                    backgroundColor: '#22c55e',
                    width: `${(BID_LEVEL_ACCUMULATOR / BID_SIZE_TOTAL) * 100}%`,
                    maxWidth: '150%',
                  }}
                >
                  <span>
                    {(BID_LEVEL_ACCUMULATOR += level.size).toLocaleString()}
                  </span>
                </div>
              </td>
              <td className='w-1/3 text-green-400 dark:text-green-600'>
                {level.size.toLocaleString()}
              </td>
              <td
                className={classNames({
                  'w-1/3 text-green-400 dark:text-green-600': true,
                  'text-right': COMPONENT_W < GRID_BREAK_W,
                })}
              >
                {numberParser(level.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table
        className={classNames({
          'w-1/2 table-fixed border-collapse text-left': true,
          'w-full': COMPONENT_W < GRID_BREAK_W,
        })}
        cellSpacing='0'
      >
        <thead className='text-slate-600'>
          <tr className='h-4 leading-none'>
            <th className='w-1/3'>Ask</th>
            <th className='w-1/3'>Size</th>
            <th
              className={classNames({
                'w-1/3': true,
                'text-right': COMPONENT_W < GRID_BREAK_W,
              })}
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody className='box-border'>
          {asks.map((level: TorderBook) => (
            <tr
              key={level.id}
              className='h-4 leading-none hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
            >
              <td className='w-1/3'>
                <div
                  className='whitespace-nowrap'
                  style={{
                    backgroundColor: '#dc2626',
                    width: `${(ASK_LEVEL_ACCUMULATOR / ASK_SIZE_TOTAL) * 100}%`,
                    maxWidth: '150%',
                  }}
                >
                  <span>
                    {(ASK_LEVEL_ACCUMULATOR += level.size).toLocaleString()}
                  </span>
                </div>
              </td>
              <td className='w-1/3 text-red-400 dark:text-red-600'>
                {level.size.toLocaleString()}
              </td>
              <td
                className={classNames({
                  'w-1/3 text-red-400 dark:text-red-600': true,
                  'text-right': COMPONENT_W < GRID_BREAK_W,
                })}
              >
                {numberParser(level.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BitMEXOrderbook;
