import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import {
  TABLE_NAME_WALLET,
  symbolSignificantFiguresMap,
} from '@/lib/consts/terminal/bitmex';
import { CryptoIconMap } from '@/lib/consts/terminal/cryptoIconMap';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TWallet } from '@/lib/types/BitmexDataTypes';
import Image from 'next/image';
import { useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';

const BitMEXWallet = () => {
  const { data, sendJsonMessage } = useBitmexWs<TWallet>(TABLE_NAME_WALLET);

  useEffect(() => {
    sendJsonMessage({
      op: 'subscribe',
      args: [TABLE_NAME_WALLET],
    });

    return () => {
      sendJsonMessage({
        op: 'unsubscribe',
        args: [TABLE_NAME_WALLET],
      });
    };
  }, [sendJsonMessage]);

  return (
    <>
      {data.map((asset) => (
        <Collapsible key={asset.currency}>
          <CollapsibleTrigger asChild>
            <div className='group flex w-full flex-row items-center justify-between px-1 py-2 transition-all hover:bg-secondary'>
              <div className='flex flex-row items-center space-x-2'>
                <Image
                  src={CryptoIconMap[asset.currency.toLowerCase()]}
                  height={16}
                  width={16}
                  alt={asset.currency}
                />
                <span>{asset.currency}</span>
              </div>

              <div className='flex flex-row items-center justify-end space-x-2'>
                <span>
                  {(
                    asset.amount /
                    10 **
                      symbolSignificantFiguresMap[asset.currency.toLowerCase()]
                  ).toFixed(8)}
                </span>
                <LuChevronDown
                  size={ICON_SIZE_SMALL}
                  className='shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180'
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent asChild>
            <div className='flex flex-col space-y-2 px-2 py-1'>
              <div className='flex flex-row items-center justify-between'>
                <span className='text-muted-foreground text-xs'>Available</span>
                <span className='mr-5'>
                  {(
                    asset.amount /
                    10 **
                      symbolSignificantFiguresMap[asset.currency.toLowerCase()]
                  ).toFixed(8)}
                </span>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <span className='text-muted-foreground text-xs'>
                  Pending Deposit
                </span>
                <span className='mr-5'>
                  {(
                    asset.pendingCredit /
                    10 **
                      symbolSignificantFiguresMap[asset.currency.toLowerCase()]
                  ).toFixed(8)}
                </span>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <span className='text-muted-foreground text-xs'>
                  Pending Withdrawal
                </span>
                <span className='mr-5'>
                  {(
                    asset.pendingDebit /
                    10 **
                      symbolSignificantFiguresMap[asset.currency.toLowerCase()]
                  ).toFixed(8)}
                </span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
};

export default BitMEXWallet;
