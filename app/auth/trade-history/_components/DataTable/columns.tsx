'use client';
import { Button } from '@/components/ui/button';
import { thTrade } from '@/types/ccxtTypes';
import { ColumnDef } from '@tanstack/react-table';
import { LuArrowUpDown } from 'react-icons/lu';

export const columns: ColumnDef<thTrade>[] = [
  { accessorKey: 'id', header: 'id' },
  {
    accessorKey: 'symbol',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          symbol
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'datetime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          datetime
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          type
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'side',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          side
          <LuArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  { accessorKey: 'price', header: 'price' },
  { accessorKey: 'amount', header: 'amount' },
];
