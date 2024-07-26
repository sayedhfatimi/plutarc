'use client';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { RxMoon, RxSun } from 'react-icons/rx';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <RxSun className='dark:-rotate-90 size-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0' />
      <RxMoon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
