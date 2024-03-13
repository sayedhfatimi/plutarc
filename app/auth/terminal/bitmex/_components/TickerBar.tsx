import { Instrument } from '@/types/BitmexDataTypes';
import { Box, Flex } from '@radix-ui/themes';
import { useData } from '../hooks/useData';
import TickerInfo from './TickerInfo';
import TickerSelector from './TickerSelector';

const TickerBar = ({ ticker }: { ticker: string }) => {
  const { data } = useData<Instrument>(ticker, 'instrument');

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
