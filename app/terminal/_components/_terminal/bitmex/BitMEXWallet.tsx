import {
  TABLE_NAME_WALLET,
  symbolSignificantFiguresMap,
} from '@/lib/consts/terminal/bitmex';
import { CryptoIconMap } from '@/lib/consts/terminal/cryptoIconMap';
import useBitmexWs from '@/lib/hooks/useBitmexWs';
import type { TWallet } from '@/lib/types/BitmexDataTypes';
import Image from 'next/image';
import { useEffect } from 'react';

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
    <div className='flex flex-col'>
      {data.map((asset) => (
        <div
          key={asset.currency}
          className='flex flex-row items-center justify-between px-1 py-2 hover:bg-secondary'
        >
          <div className='flex flex-row items-center space-x-2'>
            <Image
              src={CryptoIconMap[asset.currency.toLowerCase()]}
              height={16}
              width={16}
              alt={asset.currency}
            />
            <span>{asset.currency}</span>
          </div>
          <div>
            {(
              asset.amount /
              10 ** symbolSignificantFiguresMap[asset.currency.toLowerCase()]
            ).toFixed(8)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BitMEXWallet;
