'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import { cn } from '@/lib/utils';
import React from 'react';
import BitMEXLastPrice from './bitmex/BitMEXLastPrice';

const LastPrice = React.forwardRef<
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
    const exchange = useAppSelector(
      (state) => state.userContext.terminal.exchange,
    );

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
            <BitMEXLastPrice />
          </div>
        );
      }
    }
  },
);

LastPrice.displayName = 'LastPrice';

export default LastPrice;
