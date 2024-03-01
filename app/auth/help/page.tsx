import PageHeading from '@/app/auth/_components/PageHeading';
import { Box } from '@radix-ui/themes';

const HelpPage = () => {
  return (
    <>
      <Box className='border bg-background p-2 shadow-sm'>
        <PageHeading
          heading='Help'
          description='Everything you need to know about plutarc'
        />
      </Box>
    </>
  );
};

export default HelpPage;
