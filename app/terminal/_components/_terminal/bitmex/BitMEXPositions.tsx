import { TABLE_NAME_POSITION } from '@/lib/consts/terminal/bitmex';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TPosition } from '@/lib/types/BitmexDataTypes';
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

  return (
    <>
      <table>
        <thead className='border-b'>
          <tr>
            <th>Ticker</th>
            <th>Size</th>
            <th>Value</th>
            <th>Entry</th>
            <th>Mark</th>
            <th>Liquidation</th>
            <th>Margin</th>
            <th>Leverage</th>
            <th>Position PnL</th>
            <th>ROE %</th>
            <th>Unrealised PnL</th>
            <th>Realised PnL</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody className='box-border'>
          {!data || data.length === 0 ? (
            <tr>
              <td>No data</td>
            </tr>
          ) : (
            <>
              {data.map((position) => (
                <tr
                  key={position.account + position.symbol + position.currency}
                >
                  <td>{position.symbol}</td>
                  <td>{position.currentQty}</td>
                  <td>{position.currentCost}</td>
                  <td>{position.avgEntryPrice}</td>
                  <td>{position.markPrice}</td>
                  <td>{position.liquidationPrice}</td>
                  <td>{position.posMargin}</td>
                  <td>{position.leverage}</td>
                  <td>{position.realisedCost}</td>
                  <td>{position.unrealisedRoePcnt}</td>
                  <td>{position.unrealisedPnl}</td>
                  <td>{position.realisedPnl}</td>
                  <td>
                    <button type='button'>Close</button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default BitMEXPositions;
