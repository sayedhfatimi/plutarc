'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { defaultTerminalLayout } from '@/lib/consts/terminal/config';
import {
  ICON_SIZE_SMALL,
  KB_SHORTCUT_TERMINAL_SETTINGS,
} from '@/lib/consts/UI';
import {
  addComponent,
  removeComponent,
} from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { LuEye, LuEyeOff, LuSettings } from 'react-icons/lu';

const TerminalSettings = () => {
  const [open, setOpen] = useState(false);
  const terminalLayout = useAppSelector(
    (state) => state.userContext.terminalLayout,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === KB_SHORTCUT_TERMINAL_SETTINGS && (e.metaKey || e.ctrlKey)) {
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
          <LuSettings size={ICON_SIZE_SMALL} />
          <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
            <span className='text-xs'>CTRL/⌘+</span>
            {KB_SHORTCUT_TERMINAL_SETTINGS.toUpperCase()}
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px]'>
        <div className='flex flex-col space-y-2'>
          {defaultTerminalLayout.map((component) => (
            <div
              key={component.i}
              className='flex flex-row items-center justify-between px-1 py-2 hover:bg-secondary'
            >
              <Label htmlFor={component.i} className='font-mono text-sm'>
                {component.i}
              </Label>
              <div className='flex flex-row items-center space-x-4'>
                <LuEyeOff size={ICON_SIZE_SMALL} />
                <Switch
                  id={component.i}
                  checked={_.some(terminalLayout, (o) => o.i === component.i)}
                  onCheckedChange={() => {
                    if (_.some(terminalLayout, (o) => o.i === component.i)) {
                      dispatch(removeComponent(component));
                    } else {
                      dispatch(addComponent(component));
                    }
                  }}
                />
                <LuEye size={ICON_SIZE_SMALL} />
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TerminalSettings;
