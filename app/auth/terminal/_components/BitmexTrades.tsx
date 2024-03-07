'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/lib/redux/hooks';
import { bitmexReducer } from '@/lib/utils';
import { BitmexWebSocketResponse, RecentTrades } from '@/types/BitmexDataTypes';
import { Box, Flex, Grid } from '@radix-ui/themes';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';
import useWebSocket from 'react-use-websocket';

const BitmexTrades = () => {
  const [data, setData] = useState([] as RecentTrades[]);

  const selectedTicker = useAppSelector((state) => state.BitmexSelectedTicker);

  const {
    lastJsonMessage,
  }: { lastJsonMessage: BitmexWebSocketResponse<RecentTrades> } = useWebSocket(
    `wss://ws.bitmex.com/realtime`,
    {
      onOpen: () =>
        console.log(
          `Connected to BitMex WebSocket API, subscribed to trade:${selectedTicker}`,
        ),
      shouldReconnect: (closeEvent) => true,
      heartbeat: {
        message: 'ping',
        returnMessage: 'pong',
        timeout: 60 * 1000,
        interval: 30 * 1000,
      },
      queryParams: { subscribe: `trade:${selectedTicker}` },
    },
  );

  useEffect(() => {
    bitmexReducer<RecentTrades>(lastJsonMessage, data, setData, 'trade', 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return (
    <>
      <Box className='font-mono text-xs'>
        <Grid columns='5' className=' pr-2 text-slate-600'>
          <Box>Symbol</Box>
          <Box>Side</Box>
          <Box className='text-right'>Size</Box>
          <Box className='text-right'>Price</Box>
          <Box className='text-right'>time</Box>
        </Grid>
        <ScrollArea className='h-[200px] border pr-2'>
          <Flex direction='column-reverse'>
            {data.map((item: RecentTrades) => (
              <Grid
                key={item.trdMatchID}
                columns='5'
                className={classnames({
                  'hover:bg-slate-200/50 dark:hover:bg-slate-200/50': true,
                  'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-600':
                    item.side === 'Buy',
                  'bg-red-50 text-red-400 dark:bg-red-950/20 dark:text-red-600':
                    item.side === 'Sell',
                })}
              >
                <Box>{item.symbol}</Box>
                <Box>{item.side}</Box>
                <Box className='text-right'>{item.size.toLocaleString()}</Box>
                <Box>
                  <Flex align='center' justify='end'>
                    <Box>
                      {item.tickDirection === 'PlusTick' ? (
                        <TiArrowUp />
                      ) : item.tickDirection === 'MinusTick' ? (
                        <TiArrowDown />
                      ) : null}
                    </Box>
                    <Box>{item.price.toFixed(1)}</Box>
                  </Flex>
                </Box>
                <Box className='text-right text-slate-600'>
                  {(Date.now() - Date.parse(item.timestamp)) / 1000 + 's'}
                </Box>
              </Grid>
            ))}
          </Flex>
        </ScrollArea>
      </Box>
    </>
  );
};

export const MemoBitmexTrades = React.memo(BitmexTrades);
