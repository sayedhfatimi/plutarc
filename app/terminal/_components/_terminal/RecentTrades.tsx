'use client';
import { useVault } from '@/Providers/VaultProvider';
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps';
import { cn } from '@/lib/utils';
import React from 'react';
import GridComponentTitleBar from './GridComponentTitleBar';
import BitMEXRecentTrades from './bitmex/BitMEXRecentTrades';

const RecentTrades = React.forwardRef<
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
    const exchange = useVault((state) => state.terminal.exchange);

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
            <BitMEXRecentTrades />
          </div>
        );
      }
    }
  },
);

RecentTrades.displayName = 'RecentTrades';

export default RecentTrades;
