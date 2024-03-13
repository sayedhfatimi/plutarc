'use client';
import { orderBookL2_25 } from '@/types/BitmexDataTypes';
import { Grid } from '@radix-ui/themes';
import { useData } from '../hooks/useData';
import { numberParser } from '../lib/utils';

const BitmexOrderbook = ({ ticker }: { ticker: string }) => {
  const { data } = useData<orderBookL2_25>(
    ticker.toUpperCase(),
    'orderBookL2_25',
  );

  // get total of size of bids from all bids in state
  const bidSizeTotal: number = data
    .filter((item: orderBookL2_25) => item.side === 'Buy')
    .slice(0, 10) // only get 10 // TODO: make this dynamic with onResize
    .reduce((acc: any, val: orderBookL2_25) => acc + val.size, 0);

  // get total of size of asks from all asks in state
  const askSizeTotal: number = data
    .filter((item: orderBookL2_25) => item.side === 'Sell')
    .slice(0, 10) // only get 10 // TODO: make this dynamic with onResize
    .reduce((acc: any, val: orderBookL2_25) => acc + val.size, 0);

  let bidTotal: number = 0;
  let askTotal: number = 0;

  return (
    <>
      <Grid columns='2' gap='2' className='font-mono text-xs font-thin'>
        <table
          className='table-auto text-right'
          style={{ direction: 'rtl' }}
          cellSpacing='0'
        >
          <thead className='text-slate-600'>
            <tr>
              <th className='w-1/3'>Bid</th>
              <th className='w-1/3'>Size</th>
              <th className='w-1/3'>Price</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item: orderBookL2_25) => item.side === 'Buy')
              .sort((a: orderBookL2_25, b: orderBookL2_25) => b.price - a.price)
              .slice(0, 10)
              .map((item: orderBookL2_25) => (
                <tr
                  key={item.id}
                  className='hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
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
                      <span>{(bidTotal += item.size).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className='text-green-400 dark:text-green-600'>
                    {item.size.toLocaleString()}
                  </td>
                  <td className='text-green-400 dark:text-green-600'>
                    {numberParser(item.price)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <table className='table-auto text-left' cellSpacing='0'>
          <thead className='text-slate-600'>
            <tr>
              <th className='w-1/3'>Ask</th>
              <th className='w-1/3'>Size</th>
              <th className='w-1/3'>Price</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item: orderBookL2_25) => item.side === 'Sell')
              .sort((a: orderBookL2_25, b: orderBookL2_25) => a.price - b.price)
              .slice(0, 10)
              .map((item: orderBookL2_25) => (
                <tr
                  key={item.id}
                  className='hover:bg-slate-200/50 dark:hover:bg-slate-200/50'
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
                      <span>{(askTotal += item.size).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className='text-red-400 dark:text-red-600'>
                    {item.size.toLocaleString()}
                  </td>
                  <td className='text-red-400 dark:text-red-600'>
                    {numberParser(item.price)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Grid>
    </>
  );
};

export default BitmexOrderbook;
