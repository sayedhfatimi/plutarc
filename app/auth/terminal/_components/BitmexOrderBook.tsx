'use client';
import {
  deleteOrderbook,
  initialiseState,
  insertOrderbook,
  updateOrderbook,
} from '@/lib/redux/features/orderbook/orderbook';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const BitmexOrderbook = () => {
  const orderbookData = useAppSelector((state) => state.orderbook);

  const orderbookDispatch = useAppDispatch();

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    'wss://ws.bitmex.com/realtime?subscribe=orderBookL2_25:XBTUSD',
    {
      onOpen: () =>
        console.log(
          'Connected to BitMex WebSocket API, Subscribed to orderBookL2_25',
        ),
      shouldReconnect: (closeEvent) => true,
    },
  );

  useEffect(() => {
    if (lastMessage !== null) {
      switch (JSON.parse(lastMessage.data).action) {
        case 'partial': {
          orderbookDispatch(initialiseState(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'insert': {
          orderbookDispatch(insertOrderbook(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'update': {
          orderbookDispatch(updateOrderbook(JSON.parse(lastMessage.data).data));
          break;
        }
        case 'delete': {
          orderbookDispatch(deleteOrderbook(JSON.parse(lastMessage.data).data));
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  let bidTotal: any = 0;
  let askTotal = 0;

  return (
    <>
      <Flex gap='1' className='border p-1'>
        <Flex gap='2' className='bg-emerald-600 p-1 dark:bg-emerald-900'>
          <Flex direction='column' gap='1'>
            <Text size='2' className='text-end font-mono'>
              Price
            </Text>
            <ul className='text-end font-mono text-sm'>
              {orderbookData.map(
                (item) =>
                  item.side === 'Buy' && (
                    <li key={item.id}>{parseFloat(item.price).toFixed(1)}</li>
                  ),
              )}
            </ul>
          </Flex>
          <Flex direction='column' gap='1'>
            <Text size='2' className='text-right font-mono'>
              Size
            </Text>
            <ul className='text-right font-mono text-sm'>
              {orderbookData.map(
                (item) =>
                  item.side === 'Buy' && <li key={item.id}>{item.size}</li>,
              )}
            </ul>
          </Flex>
          <Flex direction='column' gap='1'>
            <Text size='2' className='text-right font-mono'>
              Bid Total
            </Text>
            <ul className='text-right font-mono text-sm'>
              {orderbookData.map(
                (item) =>
                  item.side === 'Buy' && (
                    <li key={item.id}>{(bidTotal += parseInt(item.size))}</li>
                  ),
              )}
            </ul>
          </Flex>
        </Flex>
        <Flex gap='2' className='bg-red-600 p-1 dark:bg-red-900'>
          <Flex direction='column' gap='1'>
            <Text size='2' className='text-left font-mono'>
              Ask Total
            </Text>
            <ul className='text-left font-mono text-sm'>
              {orderbookData.map(
                (item) =>
                  item.side === 'Sell' && (
                    <li key={item.id}>{(askTotal += parseInt(item.size))}</li>
                  ),
              )}
            </ul>
          </Flex>
          <Flex direction='column' gap='1'>
            <Text size='2' className='text-left font-mono'>
              Size
            </Text>
            <ul className='text-left font-mono text-sm'>
              {orderbookData.map(
                (item) =>
                  item.side === 'Sell' && <li key={item.id}>{item.size}</li>,
              )}
            </ul>
          </Flex>
          <Flex direction='column' gap='1'>
            <Text size='2' className='text-left font-mono'>
              Price
            </Text>
            <ul className='text-left font-mono text-sm'>
              {orderbookData.map(
                (item) =>
                  item.side === 'Sell' && (
                    <li key={item.id}>{parseFloat(item.price).toFixed(1)}</li>
                  ),
              )}
            </ul>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default BitmexOrderbook;
