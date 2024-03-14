import PageHeading from '@/app/auth/_components/PageHeading';
import { Box } from '@radix-ui/themes';

const HelpPage = () => {
  return (
    <>
      <Box className='h-full w-full border bg-slate-200 p-1 shadow-sm dark:bg-background'>
        <PageHeading
          heading='Help'
          description='Everything you need to know about plutarc'
        />
      </Box>
    </>
  );
};

export default HelpPage;
