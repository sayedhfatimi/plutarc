'use client';
import {
  deleteItem,
  initialiseState,
  insertItem,
  updateItems,
} from '@/lib/redux/features/bitmex/orderbook';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Grid } from '@radix-ui/themes';
import { Key, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const BitmexOrderbook = () => {
  const orderbookData = useAppSelector((state) => state.orderbook);

  const orderbookDispatch = useAppDispatch();

  const { lastMessage } = useWebSocket(
    'wss://ws.bitmex.com/realtime?subscribe=orderBookL2_25:XBTUSD',
    {
      onOpen: () =>
        console.log(
          'Connected to BitMex WebSocket API, Subscribed to orderBookL2_25',
        ),
      shouldReconnect: (closeEvent) => true,
    },
  );

  useEffect(() => {
    if (
      lastMessage !== null &&
      JSON.parse(lastMessage.data).table === 'orderBookL2_25'
    ) {
      switch (JSON.parse(lastMessage.data).action) {
        case 'partial': {
          orderbookDispatch(initialiseState(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'insert': {
          orderbookDispatch(insertItem(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'update': {
          orderbookDispatch(updateItems(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'delete': {
          orderbookDispatch(deleteItem(JSON.parse(lastMessage.data).data));
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  const bidSizeTotal: number = orderbookData
    .filter((item: { side: string }) => item.side === 'Buy')
    .slice(0, 10)
    .reduce((acc: any, val: { size: any }) => acc + val.size, 0);

  const askSizeTotal: number = orderbookData
    .filter((item: { side: string }) => item.side === 'Sell')
    .slice(0, 10)
    .reduce((acc: any, val: { size: any }) => acc + val.size, 0);

  let bidTotal: number = 0;
  let askTotal: number = 0;

  return (
    <>
      <Grid
        columns={{ initial: '1', md: '2' }}
        width='auto'
        gap='2'
        p='2'
        className='border'
      >
        <table
          className='table-fixed text-right font-mono text-sm'
          style={{ direction: 'rtl' }}
        >
          <thead className='text-slate-600'>
            <tr>
              <th>Bid Total</th>
              <th>Size</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderbookData
              .filter((item: { side: string }) => item.side === 'Buy')
              .sort(
                (a: { price: number }, b: { price: number }) =>
                  b.price - a.price,
              )
              .slice(0, 10)
              .map(
                (item: {
                  id: Key | null | undefined;
                  size: string;
                  price: string;
                }) => (
                  <tr
                    key={item.id}
                    className='hover:bg-secondary dark:hover:bg-secondary'
                  >
                    <td>
                      <div
                        className='whitespace-nowrap'
                        style={{
                          backgroundColor: '#22c55e',
                          width: `${(bidTotal / bidSizeTotal) * 100}%`,
                          maxWidth: '150%',
                        }}
                      >
                        <span>
                          {(bidTotal += parseInt(item.size)).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className='text-green-400 dark:text-green-600'>
                      {item.size.toLocaleString()}
                    </td>
                    <td className='text-green-400 dark:text-green-600'>
                      {parseFloat(item.price).toFixed(1)}
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>
        <table className='table-fixed text-left font-mono text-sm'>
          <thead className='text-slate-600'>
            <tr>
              <th>Ask Total</th>
              <th>Size</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderbookData
              .filter((item: { side: string }) => item.side === 'Sell')
              .sort(
                (a: { price: number }, b: { price: number }) =>
                  a.price - b.price,
              )
              .slice(0, 10)
              .map(
                (item: {
                  id: Key | null | undefined;
                  size: string;
                  price: string;
                }) => (
                  <tr
                    key={item.id}
                    className='hover:bg-secondary dark:hover:bg-secondary'
                  >
                    <td>
                      <div
                        className='whitespace-nowrap'
                        style={{
                          backgroundColor: '#dc2626',
                          width: `${(askTotal / askSizeTotal) * 100}%`,
                          maxWidth: '150%',
                        }}
                      >
                        <span>
                          {(askTotal += parseInt(item.size)).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className='text-red-400 dark:text-red-600'>
                      {item.size.toLocaleString()}
                    </td>
                    <td className='text-red-400 dark:text-red-600'>
                      {parseFloat(item.price).toFixed(1)}
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>
      </Grid>
    </>
  );
};

export default BitmexOrderbook;
