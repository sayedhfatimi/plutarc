import classNames from 'classnames';
import { ReadyState } from 'react-use-websocket';

const ConnectionStatusLabel = ({ state }: { state: ReadyState }) => {
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Connected',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[state];

  return (
    <div
      className={classNames({
        'flex flex-row items-center space-x-2 rounded-md px-2 py-1': true,
        'bg-green-950': connectionStatus === 'Connected',
        'bg-yellow-950': connectionStatus === 'Connecting',
        'bg-red-950': connectionStatus === 'Closed',
      })}
    >
      <span className='relative flex size-4'>
        <span
          className={classNames({
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75': true,
            'bg-green-400': connectionStatus === 'Connected',
            'bg-yellow-400': connectionStatus === 'Connecting',
            'bg-red-400': connectionStatus === 'Closed',
          })}
        />
        <span
          className={classNames({
            'relative inline-flex size-4 rounded-full': true,
            'bg-green-400': connectionStatus === 'Connected',
            'bg-yellow-400': connectionStatus === 'Connecting',
            'bg-red-400': connectionStatus === 'Closed',
          })}
        />
      </span>
      <span className='text-white'>{connectionStatus}</span>
    </div>
  );
};

export default ConnectionStatusLabel;
