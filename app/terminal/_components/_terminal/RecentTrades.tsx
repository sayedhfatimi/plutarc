import { cn } from '@/lib/utils';
import React from 'react';
import { LuClock, LuFish } from 'react-icons/lu';

const RecentTrades = React.forwardRef<
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
    // if (!data || data.length === 0)
    //   return (
    //     <div className='h-full place-content-center place-items-center text-center'>
    //       <Spinner />
    //     </div>
    //   );

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
        <div className='grid w-full grid-cols-8 pr-2 text-slate-600'>
          <div>
            <LuFish />
          </div>
          <div>Side</div>
          <div>Size</div>
          <div>Price</div>
          <div>
            <LuClock />
          </div>
        </div>
        {children}
      </div>
    );
  },
);

RecentTrades.displayName = 'RecentTrades';

export default RecentTrades;
