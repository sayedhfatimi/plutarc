import { cn } from '@/lib/utils';
import React from 'react';

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
      </div>
    );
  },
);

OrderForm.displayName = 'OrderForm';

export default OrderForm;
