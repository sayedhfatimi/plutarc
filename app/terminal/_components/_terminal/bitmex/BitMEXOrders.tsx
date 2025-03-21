// biome-ignore lint/style/useNodejsImportProtocol: importing browserified crypto
import { createHmac } from 'crypto';
import { useVault } from '@/Providers/VaultProvider';
import { Button } from '@/components/ui/button';
import restRequest from '@/lib/actions/bitmex/restRequest';
import { TABLE_NAME_ORDER } from '@/lib/consts/terminal/bitmex';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TOrder } from '@/lib/types/bitmex/TOrder';
import classNames from 'classnames';
import { useEffect } from 'react';

const BitMEXOrders = () => {
  const selectedAPIKey = useVault((state) => state.terminal.selectedKey);
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

  const handleCancelOrder = async (formData: FormData) => {
    const verb = 'DELETE';
    const path = '/api/v1/order';
    const expires = (Math.round(new Date().getTime() / 1000) + 60).toString();
    const data = { orderID: formData.get('orderID') };
    const postBody = JSON.stringify(data);

    const signature = createHmac('sha256', selectedAPIKey.apiSecret)
      .update(verb + path + expires + postBody)
      .digest('hex');

    const headers = {
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'api-expires': expires,
      'api-key': selectedAPIKey.apiKey,
      'api-signature': signature,
    };

    await restRequest(verb, path, headers, postBody);
  };

  const filteredData = data
    .filter((order) => order.ordStatus !== 'Canceled')
    .filter((order) => order.ordStatus !== 'Rejected');

  return (
    <table className='table-auto'>
      <thead>
        <tr className='border-b'>
          <th className='text-left'>Ticker</th>
          <th className='text-right'>Size</th>
          <th className='text-right'>Price</th>
          <th className='text-right'>Remaining</th>
          <th className='text-right'>Fill Price</th>
          <th className='text-right'>Type</th>
          <th className='text-right'>Status</th>
          <th className='text-right'>Time</th>
          <th className='text-right'>Action</th>
        </tr>
      </thead>
      <tbody className='box-border'>
        {!filteredData || filteredData.length === 0 ? (
          <tr>
            <td>No data</td>
          </tr>
        ) : (
          <>
            {filteredData.map((order) => (
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
                <td className='text-right'>
                  {order.leavesQty.toLocaleString()}
                </td>
                <td className='text-right'>{order.avgPx}</td>
                <td className='text-right'>{order.ordType}</td>
                <td className='text-right'>{order.ordStatus}</td>
                <td className='text-right'>
                  {new Date(order.timestamp).toLocaleTimeString()}
                </td>
                <td className='text-right'>
                  <form action={handleCancelOrder}>
                    <input type='hidden' value={order.orderID} name='orderID' />
                    <Button
                      variant='outline'
                      size='sm'
                      type='submit'
                      className='h-6 rounded-none px-1'
                    >
                      Cancel
                    </Button>
                  </form>
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
