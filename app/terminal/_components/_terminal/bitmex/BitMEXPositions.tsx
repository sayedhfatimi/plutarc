import { TABLE_NAME_POSITION } from '@/lib/consts/terminal/bitmex';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TPosition } from '@/lib/types/bitmex/TPosition';
import { numberParser } from '@/lib/utils';
import classNames from 'classnames';
import { useEffect } from 'react';

const BitMEXPositions = () => {
  const { data, sendJsonMessage } = useBitmexWs<TPosition>(TABLE_NAME_POSITION);

  useEffect(() => {
    sendJsonMessage({
      op: 'subscribe',
      args: [TABLE_NAME_POSITION],
    });

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_POSITION],
      });
    };
  }, [sendJsonMessage]);

  const filteredData = data
    .filter((position) => position.isOpen)
    .filter((position) => position.liquidationPrice);

  console.log(data);

  return (
    <table className='table-auto'>
      <thead>
        <tr className='border-b'>
          <th className='text-left'>Ticker</th>
          <th className='text-right'>Size</th>
          <th className='text-right'>Value</th>
          <th className='text-right'>Entry</th>
          <th className='text-right'>Mark</th>
          <th className='text-right text-red-600'>Liquidation</th>
          <th className='text-right'>Margin</th>
          <th className='text-right'>Leverage</th>
          <th className='text-right'>Position PnL</th>
          <th className='text-right'>ROE %</th>
          <th className='text-right'>Unrealised PnL</th>
          <th className='text-right'>Realised PnL</th>
          <th className='text-right'>Close</th>
        </tr>
      </thead>
      <tbody className='box-border'>
        {!data || data.length === 0 ? (
          <tr>
            <td>No data</td>
          </tr>
        ) : (
          <>
            {filteredData.map((position) => (
              <tr
                key={position.account + position.symbol + position.currency}
                className='h-4 leading-none hover:bg-secondary'
              >
                <td className='text-left'>
                  <div
                    className={classNames({
                      'inline-flex h-4 w-1 items-center': true,
                      'bg-green-600': position.homeNotional > 0,
                      'bg-red-600': position.homeNotional < 0,
                    })}
                  >
                    <span className='pl-2'>{position.symbol}</span>
                  </div>
                </td>
                <td
                  className={classNames({
                    'text-right font-bold': true,
                    'text-green-600': position.homeNotional > 0,
                    'text-red-600': position.homeNotional < 0,
                  })}
                >
                  {`${position.homeNotional} ${position.underlying}`}
                </td>
                <td className='text-right'>
                  {Math.abs(position.foreignNotional)}
                </td>
                <td className='text-right'>{position.avgEntryPrice}</td>
                <td className='text-right'>{position.markPrice}</td>
                <td className='text-right font-bold text-red-600'>
                  {position.liquidationPrice}
                </td>
                <td className='text-right'>
                  {`${numberParser(position.posMargin / 10 ** 6)} ${position.currency}`}
                </td>
                <td className='text-right'>
                  {position.crossMargin ? 'Cross' : `${position.leverage}x`}
                </td>
                <td className='text-right'>{position.realisedCost}</td>
                <td
                  className={classNames({
                    'text-right font-bold': true,
                    'text-green-600': position.unrealisedRoePcnt > 0,
                    'text-red-600': position.unrealisedRoePcnt < 0,
                  })}
                >
                  {`${(position.unrealisedRoePcnt * 100).toFixed(2)} %`}
                </td>
                <td
                  className={classNames({
                    'text-right font-bold': true,
                    'text-green-600': position.unrealisedPnl > 0,
                    'text-red-600': position.unrealisedPnl < 0,
                  })}
                >
                  {`${numberParser(position.unrealisedPnl / 10 ** 6)} (${(position.unrealisedPnlPcnt * 100).toFixed(2)}%)`}
                </td>
                <td
                  className={classNames({
                    'text-right font-bold': true,
                    'text-green-600': position.rebalancedPnl > 0,
                    'text-red-600': position.rebalancedPnl < 0,
                  })}
                >
                  {numberParser(position.rebalancedPnl / 10 ** 6)}
                </td>
                <td className='text-right'>
                  <button type='button'>Close</button>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default BitMEXPositions;
