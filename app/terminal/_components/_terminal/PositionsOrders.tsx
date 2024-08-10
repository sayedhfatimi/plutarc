'use client';
import { useVault } from '@/Providers/VaultProvider';
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps';
import { cn } from '@/lib/utils';
import classNames from 'classnames';
import React, { useState } from 'react';
import GridComponentTitleBar from './GridComponentTitleBar';
import NoAPIKeySelected from './NoAPIKeySelected';
import BitMEXOrders from './bitmex/BitMEXOrders';
import BitMEXPositions from './bitmex/BitMEXPositions';

const PositionsOrders = React.forwardRef<
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
    const [tab, setTab] = useState('positions');

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
            <GridComponentTitleBar item={props['data-grid']}>
              <div className='no-drag flex cursor-pointer flex-row space-x-2'>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: will implement later */}
                <div
                  onClick={() => setTab('positions')}
                  className={classNames({
                    'px-2 py-1 hover:bg-secondary/50': true,
                    'bg-secondary-foreground text-muted hover:text-muted-foreground':
                      tab === 'positions',
                  })}
                >
                  Positions
                </div>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: will implement later */}
                <div
                  onClick={() => setTab('orders')}
                  className={classNames({
                    'px-2 py-1 hover:bg-secondary/50': true,
                    'bg-secondary-foreground text-muted hover:text-muted-foreground':
                      tab === 'orders',
                  })}
                >
                  Orders
                </div>
              </div>
            </GridComponentTitleBar>
            {tab === 'positions' && <BitMEXPositions />}
            {tab === 'orders' && <BitMEXOrders />}
          </div>
        );
      }
    }
  },
);

PositionsOrders.displayName = 'PositionsOrders';

export default PositionsOrders;
