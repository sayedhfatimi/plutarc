import { useAppSelector } from '@/lib/redux/hooks';
import type { TGridComponentExtendedProps } from '@/lib/types/Terminal';
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
    const APIKey = useAppSelector((state) => state.userContext.APIKey);
    const exchange = useAppSelector(
      (state) => state.userContext.terminal.exchange,
    );

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
