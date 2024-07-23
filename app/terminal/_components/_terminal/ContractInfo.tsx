'use client';
import Spinner from '@/components/Spinner';
import useData from '@/lib/hooks/useData';
import type { Instrument } from '@/lib/types/BitmexDataTypes';
import { cn, numberParser } from '@/lib/utils';
import classNames from 'classnames';
import React from 'react';

const ContractInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      children,
      ...props
    },
    ref,
  ) => {
    const { data } = useData<Instrument>('instrument', 'symbol');

    return (
      <div
        style={{ ...style }}
        className={cn('font-mono text-xs', className)}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        {children}
        {!data || data.length === 0 ? (
          <div className='h-full place-content-center place-items-center text-center'>
            <Spinner />
          </div>
        ) : (
          <div className='group flex h-full items-center justify-evenly'>
            <div className='flex flex-row space-x-2 group-hover:hidden'>
              <div className='flex w-[96px] flex-col text-right'>
                <div>Mark Price</div>
                <div>Funding</div>
                <div>O. Interest</div>
                <div>24h Volume</div>
              </div>
              <div className='flex flex-col'>
                <div>{numberParser(data[0].markPrice)}</div>
                <div
                  className={classNames({
                    'text-red-800': data[0].fundingRate > 0.0003,
                    'text-red-500': data[0].fundingRate > 0.0002,
                    'text-green-500': data[0].fundingRate < 0.0002,
                  })}
                >{`${(data[0].fundingRate * 100).toFixed(4)}%`}</div>
                <div>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                  }).format(data[0].openInterest)}
                </div>
                <div>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                  }).format(data[0].volume24h)}
                </div>
              </div>
            </div>
            <div className='hidden flex-row space-x-2 group-hover:flex'>
              <div className='flex w-[96px] flex-col text-right'>
                <div>Index Price</div>
                <div>P. Funding</div>
                <div>O. Value</div>
                <div>24h Turnover</div>
              </div>
              <div className='flex flex-col'>
                <div>{numberParser(data[0].indicativeSettlePrice)}</div>
                <div
                  className={classNames({
                    'text-red-800': data[0].fundingRate > 0.0003,
                    'text-red-500': data[0].fundingRate > 0.0002,
                    'text-green-500': data[0].fundingRate < 0.0002,
                  })}
                >{`${(data[0].indicativeFundingRate * 100).toFixed(4)}%`}</div>
                <div>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                  }).format(data[0].openValue)}
                </div>
                <div>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                  }).format(data[0].turnover24h)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

ContractInfo.displayName = 'ContractInfo';

export default ContractInfo;
