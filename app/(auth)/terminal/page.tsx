import PageHeading from '@/components/PageHeading';
import { Box } from '@radix-ui/themes';

const TerminalPage = () => {
  return (
    <>
      <Box className='border p-2 shadow-sm'>
        <PageHeading
          heading='Terminal'
          description='Overview of all account activities'
        />
      </Box>
    </>
  );
};

export default TerminalPage;
