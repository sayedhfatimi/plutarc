'use client';
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import React from 'react';

type Dialog = {
  triggerIcon: React.ReactNode;
  triggerTitle: string;
  children: React.ReactNode;
  onSelect?: React.SyntheticEvent;
  onOpenChange?: (open: boolean) => void;
};

const DialogItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  React.PropsWithoutRef<Dialog>
>((props, forwadedRef) => {
  const {
    triggerIcon,
    triggerTitle,
    children,
    onSelect,
    onOpenChange,
    ...itemProps
  } = props;

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          ref={forwadedRef}
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

DialogItem.displayName = 'DialogItem';

export default DialogItem;
