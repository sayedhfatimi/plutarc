'use client';
import Spinner from '@/components/Spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RecentTrades } from '@/types/BitmexDataTypes';
import { Box, Flex, Grid } from '@radix-ui/themes';
import classnames from 'classnames';
import { LuArrowUpDown, LuClock, LuFish } from 'react-icons/lu';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';
import { useData } from '../hooks/useData';
import { numberParser } from '../lib/utils';

const BitmexTrades = ({ ticker }: { ticker: string }) => {
  const { data } = useData<RecentTrades>(ticker.toUpperCase(), 'trade');

  if (!data || data.length === 0)
    return (
      <Grid
        columns='1'
        className='h-full place-content-center place-items-center'
      >
        <Spinner />
      </Grid>
    );

  return (
    <>
      <Box className='font-mono text-xs'>
        <Grid columns='8' className='pr-2 text-slate-600'>
          <Flex className='col-span-2'>
            <LuFish className='ml-1' />
          </Flex>
          <Flex>Side</Flex>
          <Flex justify='end'>Size</Flex>
          <Flex justify='end' className='col-span-3' align='center'>
            <Flex>Price</Flex>
            <Box className='ml-1 h-4 w-4'>
              <LuArrowUpDown />
            </Box>
          </Flex>
          <Flex justify='end'>
            <LuClock />
          </Flex>
        </Grid>
        <ScrollArea className='h-[200px] pr-2'>
          <Flex direction='column-reverse'>
            {data.map((item: RecentTrades) => (
              <Grid
                key={item.trdMatchID}
                columns='8'
                className={classnames({
                  'auto-cols-min hover:bg-slate-200/50 dark:hover:bg-slate-200/50':
                    true,
                  'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-600':
                    item.side === 'Buy',
                  'bg-red-50 text-red-400 dark:bg-red-950/20 dark:text-red-600':
                    item.side === 'Sell',
                })}
              >
                <Flex className='col-span-2'>{item.symbol}</Flex>
                <Flex>{item.side}</Flex>
                <Flex justify='end'>{item.size.toLocaleString()}</Flex>
                <Flex justify='end' className='col-span-3'>
                  <Flex>{numberParser(item.price)}</Flex>
                  <Box className='ml-1 h-4 w-4'>
                    {item.tickDirection === 'PlusTick' ? (
                      <TiArrowUp />
                    ) : item.tickDirection === 'MinusTick' ? (
                      <TiArrowDown />
                    ) : null}
                  </Box>
                </Flex>
                <Flex className='text-slate-600' justify='end'>
                  {(
                    (Date.now() - Date.parse(item.timestamp)) /
                    1000
                  ).toLocaleString(undefined, {
                    maximumSignificantDigits: 3,
                  }) + 's'}
                </Flex>
              </Grid>
            ))}
          </Flex>
        </ScrollArea>
      </Box>
    </>
  );
};

export default BitmexTrades;
