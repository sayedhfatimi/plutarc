'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import { Box, Flex } from '@radix-ui/themes';
import classNames from 'classnames';

export default function TerminalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orderPanelSide = useAppSelector(
    (state) => state.userContext.orderPanelSide,
  );

  return (
    <>
      <Flex
        className={classNames({
          'h-full w-full flex-col md:flex-row': true,
          'flex-col-reverse md:flex-row-reverse': !orderPanelSide,
        })}
        gap='1'
      >
        <Flex className='w-full md:w-4/5'>{children}</Flex>
        <Flex className='h-full w-full md:w-1/5'>
          <Box>Form Goes Here</Box>
        </Flex>
      </Flex>
    </>
  );
}
