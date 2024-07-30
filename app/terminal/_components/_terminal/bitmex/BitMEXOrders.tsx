import { TABLE_NAME_ORDER } from '@/lib/consts/terminal/bitmex';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TOrder } from '@/lib/types/bitmex/TOrder';
import classNames from 'classnames';
import { useEffect } from 'react';

const BitMEXOrders = () => {
  const { data, sendJsonMessage } = useBitmexWs<TOrder>(TABLE_NAME_ORDER);

  useEffect(() => {
    sendJsonMessage({
      op: 'subscribe',
      args: [TABLE_NAME_ORDER],
    });

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_ORDER],
      });
    };
  }, [sendJsonMessage]);

  return (
    <table className='table-auto'>
      <thead>
        <tr className='border-b'>
          <th className='text-left'>Ticker</th>
          <th className='text-right'>Size</th>
          <th className='text-right'>Price</th>
          <th className='text-right'>Value</th>
          <th className='text-right'>Remaining</th>
          <th className='text-right'>Fill Price</th>
          <th className='text-right'>Type</th>
          <th className='text-right'>Status</th>
          <th className='text-right'>Time</th>
        </tr>
      </thead>
      <tbody className='box-border'>
        {!data || data.length === 0 ? (
          <tr>
            <td>No data</td>
          </tr>
        ) : (
          <>
            {data.map((order) => (
              <tr
                key={order.orderID}
                className='h-4 leading-none hover:bg-secondary'
              >
                <td className='text-left'>
                  <div
                    className={classNames({
                      'inline-flex h-4 w-1 items-center': true,
                      'bg-green-600': order.side === 'Buy',
                      'bg-red-600': order.side === 'Sell',
                    })}
                  >
                    <span className='pl-2'>{order.symbol}</span>
                  </div>
                </td>
                <td className='text-right'>
                  {order.orderQty.toLocaleString()}
                </td>
                <td className='text-right'>{order.price.toLocaleString()}</td>
                <td className='text-right'></td>
                <td className='text-right'>
                  {order.leavesQty.toLocaleString()}
                </td>
                <td className='text-right'>{order.avgPx}</td>
                <td className='text-right'>{order.ordType}</td>
                <td className='text-right'>{order.ordStatus}</td>
                <td className='text-right'>
                  {new Date(order.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default BitMEXOrders;
