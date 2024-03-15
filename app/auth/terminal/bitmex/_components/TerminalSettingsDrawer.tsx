import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { terminalLayout } from '@/lib/consts';
import {
  addToTerminalLayout,
  removeFromTerminalLayout,
  setOrderPanelSide,
  setShow24hRange,
  setShowLastPrice,
  setShowVWAP,
} from '@/lib/redux/features/user/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Flex, Heading } from '@radix-ui/themes';
import {
  LuEye,
  LuEyeOff,
  LuPanelBottomOpen,
  LuPanelLeft,
  LuPanelRight,
} from 'react-icons/lu';
import ConnectionStatus from './ConnectionStatus';

const TerminalSettingsDrawer = () => {
  const orderPanelSide = useAppSelector(
    (state) => state.userContext.orderPanelSide,
  );
  const showVWAP = useAppSelector((state) => state.userContext.showVWAP);
  const show24hRange = useAppSelector(
    (state) => state.userContext.show24hRange,
  );
  const showLastPrice = useAppSelector(
    (state) => state.userContext.showLastPrice,
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button size='icon' className='h-6'>
            <LuPanelBottomOpen />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <Flex justify='between' align='center'>
            <DrawerHeader>
              <DrawerTitle>Terminal Settings</DrawerTitle>
              <DrawerDescription>Customize your terminal.</DrawerDescription>
            </DrawerHeader>
            <ConnectionStatus />
          </Flex>
          <Flex className='w-full space-x-6 p-4'>
            <Flex direction='column' className='w-1/5 space-y-2'>
              <Heading>Layout Settings</Heading>
              <Flex direction='column' className='space-y-2'>
                <Flex direction='row' align='center' justify='between'>
                  <Label htmlFor='orderPanelSide'>Order Panel</Label>
                  <Flex align='center' className='space-x-2'>
                    <LuPanelLeft />
                    <Switch
                      id='orderPanelSide'
                      defaultChecked={orderPanelSide}
                      onCheckedChange={() =>
                        dispatch(setOrderPanelSide(!orderPanelSide))
                      }
                    />
                    <LuPanelRight />
                  </Flex>
                </Flex>
                <Flex direction='row' align='center' justify='between'>
                  <Label htmlFor='show24hRange'>24h Range</Label>
                  <Flex align='center' className='space-x-2'>
                    <LuEyeOff />
                    <Switch
                      id='show24hRange'
                      defaultChecked={show24hRange}
                      onCheckedChange={() =>
                        dispatch(setShow24hRange(!show24hRange))
                      }
                    />
                    <LuEye />
                  </Flex>
                </Flex>
                <Flex direction='row' align='center' justify='between'>
                  <Label htmlFor='showLastPrice'>Last Price</Label>
                  <Flex align='center' className='space-x-2'>
                    <LuEyeOff />
                    <Switch
                      id='showLastPrice'
                      defaultChecked={showLastPrice}
                      onCheckedChange={() =>
                        dispatch(setShowLastPrice(!showLastPrice))
                      }
                    />
                    <LuEye />
                  </Flex>
                </Flex>
                <Flex direction='row' align='center' justify='between'>
                  <Label htmlFor='showVWAP'>VWAP</Label>
                  <Flex align='center' className='space-x-2'>
                    <LuEyeOff />
                    <Switch
                      id='showVWAP'
                      defaultChecked={showVWAP}
                      onCheckedChange={() => dispatch(setShowVWAP(!showVWAP))}
                    />
                    <LuEye />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction='column' className='w-4/5 space-y-2'>
              <Heading>Components</Heading>
              <Flex direction='column'>
                {terminalLayout.map((item) => (
                  <Flex
                    key={item.i}
                    direction='row'
                    align='center'
                    justify='between'
                    className='bg-slate-200 p-1'
                  >
                    <Label htmlFor={item.i}>{item.i}</Label>
                    <Flex align='center' className='space-x-2'>
                      <LuEyeOff />
                      <Switch
                        id={item.i}
                        defaultChecked={true}
                        onCheckedChange={(e) => {
                          if (!e) {
                            dispatch(removeFromTerminalLayout(item));
                          } else {
                            dispatch(addToTerminalLayout(item));
                          }
                        }}
                      />
                      <LuEye />
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TerminalSettingsDrawer;
