'use client';
import KBShortcutLabel from '@/components/KBShortcutLabel';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import {
  ICON_SIZE_SMALL,
  KB_SHORTCUT_TERMINAL_SETTINGS,
} from '@/lib/consts/UI';
import { defaultTerminalLayout } from '@/lib/consts/terminal/config';
import useKBShortcut from '@/lib/hooks/useKBShortcut';
import {
  addComponent,
  removeComponent,
} from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import _ from 'lodash';
import { LuEye, LuEyeOff, LuSettings } from 'react-icons/lu';

const TerminalSettings = () => {
  const terminalLayout = useAppSelector(
    (state) => state.userContext.terminalLayout,
  );
  const dispatch = useAppDispatch();

  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_TERMINAL_SETTINGS);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='space-x-2' size='sm'>
          <LuSettings size={ICON_SIZE_SMALL} />
          <KBShortcutLabel kbKey={KB_SHORTCUT_TERMINAL_SETTINGS} />
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
