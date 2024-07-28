import { useAppSelector } from '@/lib/redux/hooks';
import { cn } from '@/lib/utils';
import React from 'react';
import ApiKeysDecryptionDialog from '../_apikeys/ApiKeysDecryptionDialog';
import BitMEXOrderForm from './bitmex/BitMEXOrderForm';

const OrderForm = React.forwardRef<
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
      (state) => state.userContext.terminal.isEncrypted,
    );
    const APIKey = useAppSelector((state) => state.userContext.APIKey);
    const exchange = useAppSelector(
      (state) => state.userContext.terminal.exchange,
    );

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

    if (Object.keys(APIKey).length === 0) {
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
            <BitMEXOrderForm />
          </div>
        );
      }
    }
  },
);

OrderForm.displayName = 'OrderForm';

export default OrderForm;
