import Spinner from '@/components/Spinner';
import { Instrument } from '@/types/BitmexDataTypes';
import { Box, Flex, Heading } from '@radix-ui/themes';
import classnames from 'classnames';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';

const TickerInfo = ({ data }: { data: Instrument[] }) => {
  if (!data || data.length === 0)
    return (
      <Box className='p-4'>
        <Spinner />
      </Box>
    );

  return (
    <>
      <Flex direction='row' gap='6' align='center'>
        <Flex gap='2'>
          <Box className='text-right text-zinc-500'>
            <Heading size='1'>Mark Price</Heading>
            <Heading size='1'>High Price</Heading>
            <Heading size='1'>Low Price</Heading>
            <Heading size='1'>24h Vol</Heading>
          </Box>
          <Box className='text-left'>
            <Heading size='1'>{data[0].markPrice.toFixed(1)}</Heading>
            <Heading size='1'>{data[0].highPrice.toFixed(1)}</Heading>
            <Heading size='1'>{data[0].lowPrice.toFixed(1)}</Heading>
            <Heading size='1'>{data[0].volume24h.toLocaleString()}</Heading>
          </Box>
        </Flex>
        <Flex direction='column'>
          <Heading size='1' className='text-right text-zinc-500'>
            24h Δ
          </Heading>
          <Heading
            className={classnames({
              'text-green-600  dark:text-green-600': data[0].lastChangePcnt > 0,
              'text-red-600 dark:text-red-600': data[0].lastChangePcnt < 0,
            })}
          >
            {(data[0].lastChangePcnt * 100).toFixed(2) + '%'}
          </Heading>
        </Flex>
        <Flex direction='column'>
          <Heading size='1' className='text-right text-zinc-500'>
            Last Price
          </Heading>
          <Flex
            align='center'
            justify='end'
            className={classnames({
              'text-green-600  dark:text-green-600':
                data[0].lastTickDirection === 'PlusTick' || 'ZeroPlusTick',
              'text-red-600 dark:text-red-600':
                data[0].lastTickDirection === 'MinusTick' || 'ZeroMinusTick',
            })}
          >
            <Box asChild className='mr-1 h-6 w-6'>
              {data[0].lastTickDirection === 'PlusTick' ? (
                <TiArrowUp />
              ) : (
                <TiArrowDown />
              )}
            </Box>
            <Heading>{data[0].lastPrice.toFixed(1)}</Heading>
          </Flex>
        </Flex>
        <Flex direction='column'>
          <Heading size='1' className='text-right text-zinc-500'>
            VWAP
          </Heading>
          <Heading>{data[0].vwap.toFixed(2)}</Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default TickerInfo;
