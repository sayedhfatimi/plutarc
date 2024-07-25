'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { LuBomb } from 'react-icons/lu';

type TDestructiveActionAlert = {
  triggerDisabled: boolean;
  triggerTitle?: string;
  triggerIcon?: IconType;
  alertDescription: string;
  alertContent?: string;
  confirmTitle: string;
  confirmFn: () => Promise<void>;
};

const DestructiveActionAlert = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.PropsWithoutRef<TDestructiveActionAlert>
>((props, ref) => {
  const {
    triggerDisabled,
    triggerTitle,
    triggerIcon,
    alertDescription,
    confirmTitle,
    confirmFn,
    alertContent,
    ...itemProps
  } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          {...itemProps}
          ref={ref}
          variant='destructive'
          className='space-x-2'
          size='sm'
          disabled={triggerDisabled}
        >
          {triggerIcon
            ? React.createElement(triggerIcon, { size: '16' })
            : null}
          {triggerTitle ? <span>{triggerTitle}</span> : null}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        {alertContent ? (
          <span className='text-red-600'>{alertContent}</span>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className='bg-red-800 font-bold text-white hover:bg-red-600'
          >
            <Button onClick={confirmFn} className='space-x-2'>
              <LuBomb size={ICON_SIZE_SMALL} />
              <span>{confirmTitle}</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

DestructiveActionAlert.displayName = 'DestructiveActionAlert';

export default DestructiveActionAlert;
