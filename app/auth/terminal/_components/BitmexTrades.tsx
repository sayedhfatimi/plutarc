'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  deleteItem,
  initialiseState,
  insertItem,
  updateItems,
} from '@/lib/redux/features/bitmex/trades';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Box, Flex, Grid } from '@radix-ui/themes';
import classnames from 'classnames';
import { useEffect } from 'react';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';
import useWebSocket from 'react-use-websocket';

const BitmexTrades = () => {
  const tradeData = useAppSelector((state) => state.trades);

  const dispatch = useAppDispatch();

  const { lastMessage } = useWebSocket(
    'wss://ws.bitmex.com/realtime?subscribe=trade:XBTUSD',
    {
      onOpen: () =>
        console.log('Connected to BitMex WebSocket API, Subscribed to trade'),
      shouldReconnect: (closeEvent) => true,
    },
  );

  useEffect(() => {
    if (
      lastMessage !== null &&
      JSON.parse(lastMessage.data).table === 'trade'
    ) {
      switch (JSON.parse(lastMessage.data).action) {
        case 'partial': {
          dispatch(initialiseState(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'insert': {
          dispatch(insertItem(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'update': {
          dispatch(updateItems(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'delete': {
          dispatch(deleteItem(JSON.parse(lastMessage.data).data));
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  return (
    <>
      <ScrollArea className='h-[260px] border p-2 font-mono text-sm'>
        <Grid columns='5' className='text-slate-600'>
          <Box>Symbol</Box>
          <Box>Side</Box>
          <Box className='text-right'>Size</Box>
          <Box className='text-right'>Price</Box>
          <Box className='text-right'>time</Box>
        </Grid>
        <Flex direction='column-reverse'>
          {tradeData.map(
            (item: {
              trdMatchID: string;
              side: string;
              symbol: string;
              size: number;
              tickDirection: string;
              price: string;
              timestamp: string;
            }) => (
              <Grid
                key={item.trdMatchID}
                columns='5'
                className={classnames({
                  'hover:bg-secondary dark:hover:bg-secondary': true,
                  'text-green-400 dark:text-green-600': item.side === 'Buy',
                  'text-red-400 dark:text-red-600': item.side === 'Sell',
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
                    <Box>{parseFloat(item.price).toFixed(1)}</Box>
                  </Flex>
                </Box>
                <Box className='text-right'>
                  {item.timestamp.substring(11, 19)}
                </Box>
              </Grid>
            ),
          )}
        </Flex>
      </ScrollArea>
    </>
  );
};

export default BitmexTrades;
