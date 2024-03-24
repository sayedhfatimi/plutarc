'use client';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Box, Flex } from '@radix-ui/themes';
import { LuMenu } from 'react-icons/lu';
import ProfileMenu from './_components/ProfileMenu';
import TerminalSettingsDrawer from './_components/TerminalSettingsDrawer';
import { Button } from '@/components/ui/button';

export default function TerminalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Box className='w-full'>{children}</Box>
      <Flex
        className='absolute bottom-0 left-0 right-0 border-t bg-background p-1 shadow-sm md:bg-background/50 md:backdrop-blur'
        justify='between'
        align='center'
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon'>
              <LuMenu />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <TerminalSettingsDrawer
          socketUrl='wss://ws.bitmex.com/realtime'
          exchange='bitmex'
        />

        <Flex align='center' justify='end' gap='2'>
          <ThemeToggle />
          <ProfileMenu />
        </Flex>
      </Flex>
    </>
  );
}
