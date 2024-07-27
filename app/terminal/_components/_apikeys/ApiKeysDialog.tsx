'use client';
import ContentWrapper from '@/components/ContentWrapper';
import KBShortcutLabel from '@/components/KBShortcutLabel';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ICON_SIZE_MEDIUM,
  ICON_SIZE_SMALL,
  KB_SHORTCUT_APIKEYS_SETTINGS,
} from '@/lib/consts/UI';
import useKBShortcut from '@/lib/hooks/useKBShortcut';
import { LuBookKey, LuKeyRound } from 'react-icons/lu';
import ApiKeysAddDialog from './ApiKeysAddDialog';
import ApiKeysTable from './ApiKeysTable';

const ApiKeysDialog = () => {
  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_APIKEYS_SETTINGS);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant='outline' className='space-x-2' size='sm'>
          <LuBookKey size={ICON_SIZE_SMALL} />
          <KBShortcutLabel kbKey={KB_SHORTCUT_APIKEYS_SETTINGS} />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className='max-w-screen-lg space-y-2'>
          <div className='flex items-center justify-between pr-6'>
            <DialogHeader>
              <DialogTitle className='flex flex-row items-center space-x-2'>
                <LuKeyRound size={ICON_SIZE_MEDIUM} />
                <span>API Keys</span>
              </DialogTitle>
              <DialogDescription>Manage your API Keys Here</DialogDescription>
            </DialogHeader>

            <ApiKeysAddDialog />
          </div>

          <ContentWrapper>
            <ApiKeysTable />
          </ContentWrapper>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ApiKeysDialog;
