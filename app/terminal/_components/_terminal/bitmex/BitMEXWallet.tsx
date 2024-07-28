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
  KB_SHORTCUT_WALLET,
} from '@/lib/consts/UI';
import useKBShortcut from '@/lib/hooks/useKBShortcut';
import { LuWallet } from 'react-icons/lu';

const BitMEXWallet = () => {
  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_WALLET);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant='outline' className='space-x-2' size='sm'>
          <LuWallet size={ICON_SIZE_SMALL} />
          <KBShortcutLabel kbKey={KB_SHORTCUT_WALLET} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] font-mono text-sm'>
        <div className='flex flex-col space-y-2'>
          <header className='flex flex-row items-center space-x-2'>
            <LuWallet size={ICON_SIZE_LARGE} />
            <div className='flex flex-col'>
              <h1 className='font-bold text-2xl'>Wallet</h1>
              <span className='text-muted-foreground text-xs'>
                Wallet balance
              </span>
            </div>
          </header>
          <Separator />
          <ContentWrapper className='space-y-2'></ContentWrapper>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BitMEXWallet;
