import { Box } from '@radix-ui/themes';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className='h-full w-full border bg-slate-200/50 p-1 shadow-sm backdrop-blur dark:bg-background/50'>
      {children}
    </Box>
  );
};

export default PageWrapper;
