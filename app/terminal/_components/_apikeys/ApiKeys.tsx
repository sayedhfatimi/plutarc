'use client';
import ContentWrapper from '@/components/ContentWrapper';
import KBShortcutLabel from '@/components/KBShortcutLabel';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  ICON_SIZE_LARGE,
  ICON_SIZE_SMALL,
  KB_SHORTCUT_APIKEYS_SETTINGS,
} from '@/lib/consts/UI';
import useKBShortcut from '@/lib/hooks/useKBShortcut';
import { LuKeyRound } from 'react-icons/lu';
import ApiKeysAddDialog from './ApiKeysAddDialog';
import ApiKeysTable from './ApiKeysTable';

const ApiKeys = () => {
  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_APIKEYS_SETTINGS);

  return (
    <Popover onOpenChange={setOpen} open={open} modal>
      <PopoverTrigger asChild>
        <Button variant='outline' className='space-x-2' size='sm'>
          <LuKeyRound size={ICON_SIZE_SMALL} />
          <KBShortcutLabel kbKey={KB_SHORTCUT_APIKEYS_SETTINGS} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[900px] space-y-2 text-pretty font-mono'>
        <div className='flex items-center justify-between'>
          <header className='flex flex-row items-center space-x-2'>
            <LuKeyRound size={ICON_SIZE_LARGE} />
            <div className='flex flex-col'>
              <h1 className='font-bold text-2xl'>API Keys</h1>
              <span className='text-muted-foreground text-xs'>
                Manage your API Keys
              </span>
            </div>
          </header>

          <ApiKeysAddDialog />
        </div>

        <Separator />

        <ContentWrapper>
          <ApiKeysTable />
        </ContentWrapper>
      </PopoverContent>
    </Popover>
  );
};

export default ApiKeys;
