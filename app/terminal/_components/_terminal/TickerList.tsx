'use client';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getTickerList } from '@/lib/actions';
import { setSelectedTicker } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Instrument } from '@/lib/types/BitmexDataTypes';
import { numberParser } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

const TickerList = () => {
  const [open, setOpen] = useState(false);
  const [searchedVal, setSearchedVal] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'symbol',
    direction: 'ascending',
  } as {
    key: keyof Instrument;
    direction: string;
  });
  const dispatch = useAppDispatch();
  const selectedTicker = useAppSelector(
    (state) => state.userContext.selectedTicker,
  );
  const exchange = useAppSelector((state) => state.userContext.exchange);

  const { data, isLoading } = useTickers<Instrument>(exchange);

  const requestSort = (key: keyof Instrument) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (isLoading || !data || data.length === 0)
    return (
      <div className='h-full place-content-center place-items-center text-center'>
        <Spinner />
      </div>
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='space-x-2'>
          <span>
            {selectedTicker
              ? `Ticker: ${selectedTicker}`
              : 'Select a ticker...'}
          </span>
          <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
            <span className='text-xs'>CTRL/⌘+</span>K
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[800px] space-y-2'>
        <div>
          <Input
            placeholder='Search for a ticker...'
            onChange={(e) => setSearchedVal(e.target.value)}
          />
        </div>
        <div className='flex h-[600px] flex-col font-mono'>
          <div className='flex-grow overflow-auto'>
            <table className='relative w-full table-fixed'>
              <thead>
                <tr>
                  <th className='sticky top-0 bg-secondary px-3 py-3'>
                    <Button
                      variant='link'
                      size='sm'
                      onClick={() => requestSort('symbol')}
                      className='flex flex-row items-center space-x-2'
                    >
                      <span>Ticker</span>
                      {sortConfig.key === 'symbol' &&
                      sortConfig.direction === 'ascending' ? (
                        <LuChevronUp />
                      ) : null}
                      {sortConfig.key === 'symbol' &&
                      sortConfig.direction === 'descending' ? (
                        <LuChevronDown />
                      ) : null}
                    </Button>
                  </th>
                  <th className='sticky top-0 bg-secondary py-3'>
                    <div className='inline-flex w-full justify-end'>
                      <Button
                        variant='link'
                        size='sm'
                        onClick={() => requestSort('lastPrice')}
                        className='flex flex-row items-center space-x-2'
                      >
                        {sortConfig.key === 'lastPrice' &&
                        sortConfig.direction === 'ascending' ? (
                          <LuChevronUp />
                        ) : null}
                        {sortConfig.key === 'lastPrice' &&
                        sortConfig.direction === 'descending' ? (
                          <LuChevronDown />
                        ) : null}
                        <span>Last Price</span>
                      </Button>
                    </div>
                  </th>
                  <th className='sticky top-0 bg-secondary py-3'>
                    <div className='inline-flex w-full justify-end'>
                      <Button
                        variant='link'
                        size='sm'
                        onClick={() => requestSort('lastChangePcnt')}
                        className='flex flex-row items-center space-x-2'
                      >
                        {sortConfig.key === 'lastChangePcnt' &&
                        sortConfig.direction === 'ascending' ? (
                          <LuChevronUp />
                        ) : null}
                        {sortConfig.key === 'lastChangePcnt' &&
                        sortConfig.direction === 'descending' ? (
                          <LuChevronDown />
                        ) : null}
                        <span>24h Change</span>
                      </Button>
                    </div>
                  </th>
                  <th className='sticky top-0 bg-secondary px-3 py-3'>
                    <div className='inline-flex w-full justify-end'>
                      <Button
                        variant='link'
                        size='sm'
                        onClick={() => requestSort('volume24h')}
                        className='flex flex-row items-center space-x-2'
                      >
                        {sortConfig.key === 'volume24h' &&
                        sortConfig.direction === 'ascending' ? (
                          <LuChevronUp />
                        ) : null}
                        {sortConfig.key === 'volume24h' &&
                        sortConfig.direction === 'descending' ? (
                          <LuChevronDown />
                        ) : null}
                        <span>24h Volume</span>
                      </Button>
                    </div>
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
                  .sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                      return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                      return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                  })
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
                          notation: 'compact',
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

function useTickers<T>(exchange: string) {
  return useQuery<T[]>({
    queryKey: ['tickers', exchange],
    queryFn: async () => await getTickerList(exchange),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
}

export default TickerList;
