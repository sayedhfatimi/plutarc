import Spinner from '@/components/Spinner';
import { Instrument } from '@/types/BitmexDataTypes';
import { Box, Flex, Heading, Separator } from '@radix-ui/themes';
import classnames from 'classnames';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { LuArrowUpDown } from 'react-icons/lu';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';
import { numberParser } from '../lib/utils';

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
        <Flex className='group w-[13rem]' align='start'>
          <Box className='flex group-hover:hidden'>
            <Flex gap='2'>
              <Box className='w-[5rem] text-right text-zinc-500'>
                <Heading size='1'>Mark Price</Heading>
                <Heading size='1'>Funding</Heading>
                <Heading size='1'>O. Interest</Heading>
                <Heading size='1'>24h Vol</Heading>
              </Box>
              <Box className='text-left'>
                <Heading size='1'>{numberParser(data[0].markPrice)}</Heading>
                <Heading size='1'>{`${(data[0].fundingRate * 100).toFixed(4)}%`}</Heading>
                <Heading size='1'>
                  {`${data[0].openInterest.toLocaleString()} ${data[0].quoteCurrency}`}
                </Heading>
                <Heading size='1'>{`${data[0].volume24h.toLocaleString()} ${data[0].quoteCurrency}`}</Heading>
              </Box>
            </Flex>
          </Box>
          <Box className='hidden group-hover:flex'>
            <Flex gap='2'>
              <Box className='w-[5rem] text-right text-zinc-500'>
                <Heading size='1'>Index Price</Heading>
                <Heading size='1'>P. Funding</Heading>
                <Heading size='1'>O. Value</Heading>
                <Heading size='1'>Turnover</Heading>
              </Box>
              <Box className='text-left'>
                <Heading size='1'>
                  {numberParser(data[0].indicativeSettlePrice)}
                </Heading>
                <Heading size='1'>
                  {`${(data[0].indicativeFundingRate * 100).toFixed(4)}%`}
                </Heading>
                <Heading size='1'>{`${(
                  data[0].openValue / 100000000
                ).toLocaleString(undefined, {
                  minimumSignificantDigits: 4,
                  maximumSignificantDigits: 8,
                })} ${data[0].rootSymbol}`}</Heading>
                <Heading size='1'>
                  {`${(data[0].turnover24h / 100000000).toLocaleString(
                    undefined,
                    {
                      minimumSignificantDigits: 4,
                      maximumSignificantDigits: 8,
                    },
                  )} ${data[0].rootSymbol}`}
                </Heading>
              </Box>
            </Flex>
          </Box>
        </Flex>

        <Separator orientation='vertical' size='2' />

        <Flex direction='column' className='text-right'>
          <Flex gap='1' className='text-zinc-500' align='center' justify='end'>
            <Heading size='1'>24h High</Heading>
            <FaArrowTrendUp />
          </Flex>
          <Heading size='4'>{numberParser(data[0].highPrice)}</Heading>
          <Flex gap='1' className='text-zinc-500' align='center' justify='end'>
            <Heading size='1'>24h Low</Heading>
            <FaArrowTrendDown />
          </Flex>
          <Heading size='4'>{numberParser(data[0].lowPrice)}</Heading>
        </Flex>

        <Separator orientation='vertical' size='2' />

        <Flex direction='column'>
          <Heading size='1' className='text-right text-zinc-500'>
            Last Price
          </Heading>
          <Flex
            align='center'
            justify='end'
            className={classnames({
              'text-green-600  dark:text-green-600':
                data[0].lastTickDirection === 'PlusTick',
              'text-red-600 dark:text-red-600':
                data[0].lastTickDirection === 'MinusTick',
            })}
          >
            <Box className='mr-1 h-6 w-6'>
              {data[0].lastTickDirection === 'PlusTick' ? (
                <TiArrowUp className='mr-1 h-6 w-6' />
              ) : null}
              {data[0].lastTickDirection === 'MinusTick' ? (
                <TiArrowDown className='mr-1 h-6 w-6' />
              ) : null}
            </Box>
            <Heading>{numberParser(data[0].lastPrice)}</Heading>
          </Flex>
          <Flex direction='row' justify='end' align='center' gap='2'>
            <Flex className='text-zinc-500' gap='1'>
              <Heading size='1'>24h</Heading>
              <LuArrowUpDown />
            </Flex>
            <Heading
              size='2'
              className={classnames({
                'text-green-600  dark:text-green-600':
                  data[0].lastChangePcnt > 0,
                'text-red-600 dark:text-red-600': data[0].lastChangePcnt < 0,
              })}
            >
              {`${data[0].lastChangePcnt > 0 ? '+' : '-'}${numberParser(data[0].lastChangePcnt * 100)}%`}
            </Heading>
          </Flex>
        </Flex>

        <Separator orientation='vertical' size='2' />

        <Flex direction='column'>
          <Heading size='1' className='text-right text-zinc-500'>
            VWAP
          </Heading>
          <Heading>{numberParser(data[0].vwap)}</Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default TickerInfo;
