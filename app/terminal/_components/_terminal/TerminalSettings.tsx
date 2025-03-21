'use client';
import { useVault } from '@/Providers/VaultProvider';
import ContentWrapper from '@/components/ContentWrapper';
import KBShortcutLabel from '@/components/KBShortcutLabel';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  ICON_SIZE_LARGE,
  ICON_SIZE_SMALL,
  KB_SHORTCUT_TERMINAL_SETTINGS,
} from '@/lib/consts/UI';
import { defaultTerminalLayout } from '@/lib/consts/terminal/gridConfig';
import useKBShortcut from '@/lib/hooks/useKBShortcut';
import _ from 'lodash';
import { LuEye, LuEyeOff, LuSettings } from 'react-icons/lu';
import { MdLockReset } from 'react-icons/md';
import ConnectionStatus from './ConnectionStatus';

const TerminalSettings = () => {
  const activeComponents = useVault((state) => state.terminal.activeComponents);
  const ticker = useVault((state) => state.terminal.ticker);
  const exchange = useVault((state) => state.terminal.exchange);
  const removeComponent = useVault((state) => state.removeComponent);
  const addComponent = useVault((state) => state.addComponent);
  const resetTerminalLayout = useVault((state) => state.resetTerminalLayout);

  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_TERMINAL_SETTINGS);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant='outline' className='space-x-2' size='sm'>
          <LuSettings size={ICON_SIZE_SMALL} />
          <KBShortcutLabel char={KB_SHORTCUT_TERMINAL_SETTINGS} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[500px] select-none font-mono text-sm'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center justify-between'>
            <header className='flex flex-row items-center space-x-2'>
              <LuSettings size={ICON_SIZE_LARGE} />
              <div className='flex flex-col'>
                <h1 className='font-bold text-2xl'>Terminal Settings</h1>
                <span className='text-muted-foreground text-xs'>
                  Edit Terminal Settings
                </span>
              </div>
            </header>
            <Button
              variant='outline'
              size='sm'
              className='space-x-2'
              onClick={() => resetTerminalLayout(defaultTerminalLayout)}
            >
              <MdLockReset size={ICON_SIZE_SMALL} />
              <span>Reset Layout</span>
            </Button>
          </div>
          <Separator />
          <ContentWrapper className='space-y-2'>
            <div className='flex flex-row items-center justify-between border p-2'>
              <div className='flex flex-row space-x-4'>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground'>Exchange</span>
                  <span>{exchange.toUpperCase()}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground'>Ticker</span>
                  <span>{ticker}</span>
                </div>
              </div>
              <ConnectionStatus />
            </div>
            {defaultTerminalLayout.map((component) => (
              <div
                key={component.i}
                className='flex flex-row items-center justify-between px-1 py-2 hover:bg-secondary'
              >
                <Label htmlFor={component.i}>{component.i}</Label>
                <div className='flex flex-row items-center space-x-4'>
                  <LuEyeOff size={ICON_SIZE_SMALL} />
                  <Switch
                    id={component.i}
                    checked={_.some(
                      activeComponents,
                      (o) => o.i === component.i,
                    )}
                    onCheckedChange={() => {
                      if (
                        _.some(activeComponents, (o) => o.i === component.i)
                      ) {
                        removeComponent(component);
                      } else {
                        addComponent(component);
                      }
                    }}
                  />
                  <LuEye size={ICON_SIZE_SMALL} />
                </div>
              </div>
            ))}
          </ContentWrapper>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TerminalSettings;
