'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { addComponent } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { useEffect, useState } from 'react';
import { LuSettings } from 'react-icons/lu';

const TerminalSettings = () => {
  const [open, setOpen] = useState(false);
  const terminalComponents = useAppSelector(
    (state) => state.userContext.terminalComponents,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='space-x-2' size='sm'>
          <LuSettings size='16' />
          <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
            <span className='text-xs'>CTRL/⌘+</span>J
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col space-y-2'>
          {terminalComponents.map((component) => (
            <div
              key={component.i}
              className='cursor-pointer border bg-secondary p-2 font-mono hover:bg-secondary/50'
              onClick={() => dispatch(addComponent(component))}
            >
              {component.i}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TerminalSettings;
