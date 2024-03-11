import { Box, Flex, Heading } from '@radix-ui/themes';
import TickerSelector from './TickerSelector';
import { useEffect, useState } from 'react';
import { BitmexWebSocketResponse, Instrument } from '@/types/BitmexDataTypes';
import useWebSocket from 'react-use-websocket';
import { bitmexDataParser } from '../lib/utils';
import { it } from 'node:test';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';
import classnames from 'classnames';

const TickerBar = ({ ticker }: { ticker: string }) => {
  const [data, setData] = useState([] as Instrument[]);

  // instantiate websocket hook and destructure the json message object
  const {
    lastJsonMessage,
  }: { lastJsonMessage: BitmexWebSocketResponse<Instrument> } = useWebSocket(
    `wss://ws.bitmex.com/realtime`,
    {
      // TODO: remove this when testing/development complete or update to more meaningful response
      onOpen: () =>
        console.log(
          `Connected to BitMex WebSocket API, subscribed to instrument:${ticker}`,
        ),
      shouldReconnect: (closeEvent) => true, // auto reconnect
      // set WebSocket hearbeat
      heartbeat: {
        message: 'ping',
        returnMessage: 'pong',
        timeout: 60 * 1000,
        interval: 30 * 1000,
      },
      queryParams: { subscribe: `instrument:${ticker}` }, // subscribe to channel
    },
  );

  useEffect(() => {
    bitmexDataParser<Instrument>(lastJsonMessage, data, setData, 'instrument');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  console.log(data);

  return (
    <Flex
      justify='between'
      align='center'
      className='bg-white p-1 dark:bg-slate-900'
    >
      <Flex direction='row' gap='4'>
        <Flex align='center'>
          {data.map((item) => (
            <Flex
              key={item.symbol}
              align='center'
              className={classnames({
                'text-green-600  dark:text-green-600':
                  item.lastTickDirection === 'PlusTick' || 'ZeroPlusTick',
                'text-red-600 dark:text-red-600':
                  item.lastTickDirection === 'MinusTick' || 'ZeroMinusTick',
              })}
            >
              <Box asChild className='mr-1 h-6 w-6'>
                {item.lastTickDirection === 'PlusTick' ? (
                  <TiArrowUp />
                ) : (
                  <TiArrowDown />
                )}
              </Box>
              <Heading>{item.lastPrice.toFixed(1)}</Heading>
            </Flex>
          ))}
        </Flex>
        <Flex gap='2'>
          <Box className='text-right text-zinc-500'>
            <Heading size='1'>Mark Price</Heading>
            <Heading size='1'>High Price</Heading>
            <Heading size='1'>Low Price</Heading>
            <Heading size='1'>Vol</Heading>
          </Box>
          {data.map((item) => (
            <Box className='text-left' key={item.symbol}>
              <Heading size='1'>{item.markPrice.toFixed(1)}</Heading>
              <Heading size='1'>{item.highPrice.toFixed(1)}</Heading>
              <Heading size='1'>{item.lowPrice.toFixed(1)}</Heading>
              <Heading size='1'>{item.volume.toLocaleString()}</Heading>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Box>
        <TickerSelector />
      </Box>
    </Flex>
  );
};

export default TickerBar;
