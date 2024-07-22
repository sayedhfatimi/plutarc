'use client';
import { Instrument } from '@/lib/types/BitmexDataTypes';
import { numberParser } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import classNames from 'classnames';
import ColumnHeaderButton from './ColumnHeaderButton';

export const TickerListColumns: ColumnDef<Instrument>[] = [
  {
    accessorKey: 'symbol',
    header: ({ column }) => {
      return <ColumnHeaderButton column={column} label='Ticker' />;
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
        <div className='flex justify-end'>
          <ColumnHeaderButton column={column} label='Last Price' />
        </div>
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
        <div className='flex justify-end'>
          <ColumnHeaderButton column={column} label='24h Change' />
        </div>
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
        <div className='flex justify-end'>
          <ColumnHeaderButton column={column} label='24h Volume' />
        </div>
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
