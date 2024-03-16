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
      className='flex-col space-y-8 bg-white py-4 shadow-sm dark:bg-slate-900 md:h-[88px] md:flex-row md:space-y-0 md:p-1'
    >
      <TickerInfo data={data} />
      <Flex direction='row' align='center' gap='2'>
        <TickerSelector />
      </Flex>
    </Flex>
  );
};

export default TickerBar;
