'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import type { TGridComponentExtendedProps } from '@/lib/types/Terminal';
import { cn } from '@/lib/utils';
import React from 'react';
import GridComponentTitleBar from './GridComponentTitleBar';
import BitMEXContractInfo from './bitmex/BitMEXContractInfo';

const ContractInfo = React.forwardRef<
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
            <GridComponentTitleBar item={props['data-grid']} />
            <BitMEXContractInfo />
          </div>
        );
      }
    }
  },
);

ContractInfo.displayName = 'ContractInfo';

export default ContractInfo;
