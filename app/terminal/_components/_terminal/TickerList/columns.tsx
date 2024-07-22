'use client';
import { Button } from '@/components/ui/button';
import { Instrument } from '@/lib/types/BitmexDataTypes';
import { numberParser } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import classNames from 'classnames';
import { LuArrowUpDown, LuMoreHorizontal } from 'react-icons/lu';

export const columns: ColumnDef<Instrument>[] = [
  {
    accessorKey: 'symbol',
    header: ({ column }) => {
      return (
        <Button
          variant='link'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ticker
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='font-mono font-bold'>{row.getValue('symbol')}</div>
      );
    },
  },
  {
    accessorKey: 'lastPrice',
    header: ({ column }) => {
      return (
        <Button
          variant='link'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Price
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('lastPrice'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className='text-right font-mono'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'lastChangePcnt',
    header: ({ column }) => {
      return (
        <Button
          variant='link'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          24h Change
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number = row.getValue('lastChangePcnt');
      return (
        <div
          className={classNames({
            'text-right font-mono': true,
            'text-green-600 dark:text-green-600': amount > 0,
            'text-red-600 dark:text-red-600': amount < 0,
          })}
        >
          {`${amount > 0 ? '+' : ''}${numberParser(amount * 100)}%`}
        </div>
      );
    },
  },
  {
    accessorKey: 'volume24h',
    header: ({ column }) => {
      return (
        <Button
          variant='link'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          24h Volume
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('volume24h'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className='text-right font-mono'>{formatted}</div>;
    },
  },
];
