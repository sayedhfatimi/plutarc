import { Badge } from '@/components/ui/badge';
import { Box, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const ConnectionStatus = () => {
  const { readyState } = useWebSocket(`wss://ws.bitmex.com/realtime`, {
    share: true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting...',
    [ReadyState.OPEN]: 'Connected to Bitmex.',
    [ReadyState.CLOSING]: 'Closing...',
    [ReadyState.CLOSED]: 'Closed.',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  return (
    <Flex className='space-x-2 px-4' align='center'>
      <Flex className='relative h-4 w-4'>
        <Box
          className={classNames({
            'relative h-full w-full animate-ping rounded-full': true,
            'bg-green-500/30': readyState === 1,
            'bg-yellow-500/30': readyState === 0,
            'bg-red-500/30': readyState === 3,
          })}
        ></Box>
        <Box
          className={classNames({
            'absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full':
              true,
            'bg-green-500': readyState === 1,
            'bg-yellow-500': readyState === 0,
            'bg-red-500': readyState === 3,
          })}
        ></Box>
      </Flex>
      <Badge>{connectionStatus}</Badge>
    </Flex>
  );
};

export default ConnectionStatus;
