import { Box } from '@radix-ui/themes';

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box className='border bg-white/80 p-1 shadow-sm dark:bg-slate-900/50'>
        {children}
      </Box>
    </>
  );
};

export default ContentWrapper;
