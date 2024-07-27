'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import { cn } from '@/lib/utils';
import React from 'react';
import BitMEXOrderbook from './bitmex/BitMEXOrderbook';

const Orderbook = React.forwardRef<
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
    const exchange = useAppSelector((state) => state.userContext.exchange);

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
            <BitMEXOrderbook />
          </div>
        );
      }
    }
  },
);

Orderbook.displayName = 'Orderbook';

export default Orderbook;
