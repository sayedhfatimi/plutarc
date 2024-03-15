import { Instrument } from '@/types/BitmexDataTypes';
import { Flex } from '@radix-ui/themes';
import { useData } from '../hooks/useData';
import TickerInfo from './TickerInfo';
import TickerSelector from './TickerSelector';

const TickerBar = ({ ticker }: { ticker: string }) => {
  const { data } = useData<Instrument>(ticker.toUpperCase(), 'instrument');

  return (
    <Flex
      justify='between'
      align='center'
      className='h-[88px] bg-white p-1 dark:bg-slate-900'
    >
      <TickerInfo data={data} />
      <Flex direction='row' align='center' gap='2'>
        <TickerSelector />
      </Flex>
    </Flex>
  );
};

export default TickerBar;
