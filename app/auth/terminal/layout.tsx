'use client';
import { Box, Flex } from '@radix-ui/themes';

export default function TerminalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Flex className='h-full w-full' direction='row' gap='1'>
        <Flex className='w-4/5'>{children}</Flex>
        <Flex className='h-full w-1/5'>
          <Box>Form Goes Here</Box>
        </Flex>
      </Flex>
    </>
  );
}
