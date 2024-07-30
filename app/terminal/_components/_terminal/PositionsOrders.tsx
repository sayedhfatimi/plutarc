'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import { cn } from '@/lib/utils';
import React from 'react';
import NoAPIKeySelected from './NoAPIKeySelected';
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
            <BitMEXPositions />
          </div>
        );
      }
    }
  },
);

PositionsOrders.displayName = 'PositionsOrders';

export default PositionsOrders;
