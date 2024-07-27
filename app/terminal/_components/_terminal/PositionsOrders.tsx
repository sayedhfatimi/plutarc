'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import { cn } from '@/lib/utils';
import React from 'react';
import ApiKeysDecryptionDialog from '../_apikeys/ApiKeysDecryptionDialog';
import BitMEXPositions from './bitmex/BitMEXPositions';

const PositionsOrders = React.forwardRef<
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
    const isEncrypted = useAppSelector(
      (state) => state.userContext.isEncrypted,
    );
    const selectedApiKey = useAppSelector((state) => state.selectedApiKey);
    const exchange = useAppSelector((state) => state.userContext.exchange);

    if (isEncrypted) {
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
          <div className='h-full place-content-center place-items-center text-center'>
            <ApiKeysDecryptionDialog />
          </div>
        </div>
      );
    }

    if (Object.keys(selectedApiKey).length === 0) {
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
          <div className='h-full place-content-center place-items-center text-center'>
            No API Keys or no API Key selected.
          </div>
        </div>
      );
    }

    switch (exchange) {
      case 'bitmex': {
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
            <BitMEXPositions />
          </div>
        );
      }
    }
  },
);

PositionsOrders.displayName = 'PositionsOrders';

export default PositionsOrders;
