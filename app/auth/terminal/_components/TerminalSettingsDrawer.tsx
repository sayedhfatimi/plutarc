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
import {
  addToTerminalLayout,
  setOrderPanelSide,
  setShow24hRange,
  setShowLastPrice,
  setShowTickerBar,
  setShowVWAP,
} from '@/lib/redux/features/user/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Box, Flex, Heading } from '@radix-ui/themes';
import {
  LuEye,
  LuEyeOff,
  LuPanelBottomOpen,
  LuPanelLeft,
  LuPanelRight,
} from 'react-icons/lu';
import ConnectionStatus from '../bitmex/_components/ConnectionStatus';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const TerminalSettingsDrawer = () => {
  const orderPanelSide = useAppSelector(
    (state) => state.userContext.orderPanelSide,
  );
  const showTickerBar = useAppSelector(
    (state) => state.userContext.showTickerBar,
  );
  const showVWAP = useAppSelector((state) => state.userContext.showVWAP);
  const show24hRange = useAppSelector(
    (state) => state.userContext.show24hRange,
  );
  const showLastPrice = useAppSelector(
    (state) => state.userContext.showLastPrice,
  );
  const terminalComponents = useAppSelector(
    (state) => state.userContext.terminalComponents,
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
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Flex
                        direction='row'
                        align='center'
                        justify='between'
                        className='px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-900'
                      >
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
                    </TooltipTrigger>
                    <TooltipContent side='right' align='start' alignOffset={-7}>
                      Choose which side you would like Order Panel to appear.
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Flex
                        direction='row'
                        align='center'
                        justify='between'
                        className='px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-900'
                      >
                        <Label htmlFor='showTickerBar'>Ticker Bar</Label>
                        <Flex align='center' className='space-x-2'>
                          <LuEyeOff />
                          <Switch
                            id='showTickerBar'
                            defaultChecked={showTickerBar}
                            onCheckedChange={() =>
                              dispatch(setShowTickerBar(!showTickerBar))
                            }
                          />
                          <LuEye />
                        </Flex>
                      </Flex>
                    </TooltipTrigger>
                    <TooltipContent side='right' align='start' alignOffset={-7}>
                      Show/Hide the Ticker Bar
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Flex
                        direction='row'
                        align='center'
                        justify='between'
                        className='px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-900'
                      >
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
                    </TooltipTrigger>
                    <TooltipContent side='right' align='start' alignOffset={-7}>
                      Show/Hide the 24h High/Low
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Flex
                        direction='row'
                        align='center'
                        justify='between'
                        className='px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-900'
                      >
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
                    </TooltipTrigger>
                    <TooltipContent side='right' align='start' alignOffset={-7}>
                      Show/Hide Last Price
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Flex
                        direction='row'
                        align='center'
                        justify='between'
                        className='px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-900'
                      >
                        <Label htmlFor='showVWAP'>VWAP</Label>
                        <Flex align='center' className='space-x-2'>
                          <LuEyeOff />
                          <Switch
                            id='showVWAP'
                            defaultChecked={showVWAP}
                            onCheckedChange={() =>
                              dispatch(setShowVWAP(!showVWAP))
                            }
                          />
                          <LuEye />
                        </Flex>
                      </Flex>
                    </TooltipTrigger>
                    <TooltipContent side='right' align='start' alignOffset={-7}>
                      Show/Hide VWAP
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Flex>
            </Flex>
            <Flex direction='column' className='w-4/5 space-y-2'>
              <Heading>Terminal Components</Heading>
              <Flex direction='row' className='space-x-4'>
                {terminalComponents.map((item) => (
                  <Flex
                    key={item.i}
                    className='cursor-pointer border bg-slate-200 p-1 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800'
                    onClick={() => dispatch(addToTerminalLayout(item))}
                  >
                    {item.i}
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
