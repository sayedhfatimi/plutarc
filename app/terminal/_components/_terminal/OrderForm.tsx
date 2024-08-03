import { useVault } from '@/Providers/VaultProvider';
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps';
import { cn } from '@/lib/utils';
import React from 'react';
import GridComponentTitleBar from './GridComponentTitleBar';
import NoAPIKeySelected from './NoAPIKeySelected';
import BitMEXOrderForm from './bitmex/BitMEXOrderForm';

const OrderForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TGridComponentExtendedProps
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
    const selectedAPIKey = useVault((state) => state.terminal.selectedKey);
    const exchange = useVault((state) => state.terminal.exchange);

    if (Object.keys(selectedAPIKey).length === 0) {
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
          <GridComponentTitleBar item={props['data-grid']} />
          <NoAPIKeySelected />
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
            <GridComponentTitleBar item={props['data-grid']} />
            <BitMEXOrderForm />
          </div>
        );
      }
    }
  },
);

OrderForm.displayName = 'OrderForm';

export default OrderForm;
