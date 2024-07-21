'use client';
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import React from 'react';

type TDropdownDialogItem = {
  triggerIcon: React.ReactNode;
  triggerTitle: string;
  children: React.ReactNode;
  onSelect?: React.SyntheticEvent;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const DropdownDialogItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  React.PropsWithoutRef<TDropdownDialogItem>
>((props, ref) => {
  const {
    triggerIcon,
    triggerTitle,
    children,
    onSelect,
    open,
    onOpenChange,
    ...itemProps
  } = props;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          ref={ref}
          className='space-x-2'
          onSelect={(e) => {
            e.preventDefault();
            onSelect;
          }}
        >
          {triggerIcon}
          <span>{triggerTitle}</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className='max-w-screen-lg space-y-2'>
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
});

DropdownDialogItem.displayName = 'DropdownDialogItem';

export default DropdownDialogItem;
