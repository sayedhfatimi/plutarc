import ContentWrapper from '@/components/ContentWrapper';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { LuSettings } from 'react-icons/lu';

const SettingsDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size='icon' variant='outline' className='space-x-2'>
          <LuSettings size='16' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terminal Settings</DrawerTitle>
          <DrawerDescription>Customize your terminal</DrawerDescription>
        </DrawerHeader>
        <ContentWrapper className='p-4'>Setting goes here</ContentWrapper>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
