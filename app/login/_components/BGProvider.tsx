'use client';
import { Box } from '@radix-ui/themes';
import darkbg from '@/assets/images/dark-bg.png';
import lightbg from '@/assets/images/light-bg.png';
import { useTheme } from 'next-themes';

const BGProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <>
      <Box
        className='h-screen w-screen'
        style={
          theme === 'dark'
            ? {
                backgroundImage: `url(${darkbg.src})`,
              }
            : {
                backgroundImage: `url(${lightbg.src})`,
              }
        }
      >
        {children}
      </Box>
    </>
  );
};

export default BGProvider;
