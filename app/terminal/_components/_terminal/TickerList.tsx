'use client';
import Spinner from '@/components/Spinner';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { setSelectedTicker } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import type { Instrument } from '@/lib/types/BitmexDataTypes';
import { bitmexDeltaParser, numberParser } from '@/lib/utils';
import classNames from 'classnames';
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

const TickerList = () => {
  const [data, setData] = useState([] as Instrument[]);
  const [open, setOpen] = useState(true);
  const [searchedVal, setSearchedVal] = useState('');
  const dispatch = useAppDispatch();
  const selectedTicker = useAppSelector(
    (state) => state.userContext.selectedTicker,
  );

  useWebSocket(
    'wss://ws.bitmex.com/realtime?subscribe=instrument:CONTRACTS',
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
      onMessage: (message) => {
        bitmexDeltaParser<Instrument>(
          JSON.parse(message.data),
          data,
          setData,
          'instrument',
        );
        if (JSON.parse(message.data).action === 'partial') setOpen(false);
      },
    },
    open, // TODO: currently this is a hack to fix blocking the rendering pipeline, consider moving to JS worker
  );

  if (!data || data.length === 0)
    return (
      <div className='h-full place-content-center place-items-center text-center'>
        <Spinner />
      </div>
    );

  console.log(data);
  return (
    <Popover>
      <PopoverTrigger>Select a ticker...</PopoverTrigger>
      <PopoverContent className='w-[800px] space-y-2'>
        <div>
          <Input
            placeholder='Search for a ticker...'
            onChange={(e) => setSearchedVal(e.target.value)}
          />
        </div>
        <div className='flex h-[600px] flex-col font-mono'>
          <div className='flex-grow overflow-auto'>
            <table className='relative w-full'>
              <thead>
                <tr>
                  <th className='sticky top-0 bg-secondary px-3 py-2 text-left font-bold'>
                    Ticker
                  </th>
                  <th className='sticky top-0 bg-secondary py-2 text-right font-bold'>
                    Last Price
                  </th>
                  <th className='sticky top-0 bg-secondary py-2 text-right font-bold'>
                    24h Change
                  </th>
                  <th className='sticky top-0 bg-secondary px-3 py-2 text-right font-bold'>
                    24h Volume
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y'>
                {data
                  .filter((ticker) => ticker.state !== 'Unlisted')
                  .filter((ticker) => ticker.volume24h !== 0)
                  .filter(
                    (ticker) =>
                      !searchedVal.length ||
                      ticker.symbol
                        .toString()
                        .toLowerCase()
                        .includes(searchedVal.toString().toLowerCase()),
                  )
                  .map((ticker) => (
                    <tr
                      key={ticker.symbol}
                      className={classNames({
                        'hover:bg-secondary': true,
                        'bg-primary-foreground':
                          ticker.symbol === selectedTicker,
                      })}
                      onClick={() => dispatch(setSelectedTicker(ticker.symbol))}
                    >
                      <td className='px-3 py-1'>{ticker.symbol}</td>
                      <td
                        className={classNames({
                          'py-1 text-right': true,
                          'text-green-600 dark:text-green-600':
                            ticker.lastChangePcnt > 0,
                          'text-red-600 dark:text-red-600':
                            ticker.lastChangePcnt < 0,
                        })}
                      >
                        {numberParser(parseFloat(ticker.lastPrice))}
                      </td>
                      <td
                        className={classNames({
                          'py-1 text-right': true,
                          'text-green-600 dark:text-green-600':
                            ticker.lastChangePcnt > 0,
                          'text-red-600 dark:text-red-600':
                            ticker.lastChangePcnt < 0,
                        })}
                      >
                        {`${ticker.lastChangePcnt > 0 ? '+' : ''}${numberParser(ticker.lastChangePcnt * 100)} %`}
                      </td>
                      <td className='px-3 py-1 text-right'>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(ticker.volume24h)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TickerList;
