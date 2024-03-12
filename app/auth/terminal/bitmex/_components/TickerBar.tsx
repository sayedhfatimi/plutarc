import { BitmexWebSocketResponse, Instrument } from '@/types/BitmexDataTypes';
import { Box, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { bitmexDataParser } from '../lib/utils';
import TickerInfo from './TickerInfo';
import TickerSelector from './TickerSelector';

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

  return (
    <Flex
      justify='between'
      align='center'
      className='bg-white p-1 dark:bg-slate-900'
    >
      <TickerInfo data={data} />
      <Box>
        <TickerSelector />
      </Box>
    </Flex>
  );
};

export default TickerBar;
