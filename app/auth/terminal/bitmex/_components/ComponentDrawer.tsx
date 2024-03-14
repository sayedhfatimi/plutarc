import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Flex } from '@radix-ui/themes';
import { LuMenu } from 'react-icons/lu';
import ConnectionStatus from './ConnectionStatus';

const ComponentDrawer = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button size='icon' variant='outline'>
            <LuMenu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <Flex justify='between' align='center'>
            <DrawerHeader>
              <DrawerTitle>Components</DrawerTitle>
              <DrawerDescription>Add/Remove UI components.</DrawerDescription>
            </DrawerHeader>
            <ConnectionStatus />
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ComponentDrawer;
