import { Box } from '@radix-ui/themes';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className='h-full w-full border bg-slate-200 p-1 shadow-sm dark:bg-background md:bg-slate-200/50 md:backdrop-blur dark:md:bg-background/50'>
      {children}
    </Box>
  );
};

export default PageWrapper;
