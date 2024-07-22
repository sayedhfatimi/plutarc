import { Button } from '@/components/ui/button';
import { Instrument } from '@/lib/types/BitmexDataTypes';
import { Column } from '@tanstack/react-table';
import { LuArrowUpDown } from 'react-icons/lu';

const ColumnHeaderButton = ({
  column,
  label,
}: {
  column: Column<Instrument, unknown>;
  label: string;
}) => {
  return (
    <Button
      variant='link'
      size='sm'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className='space-x-2 p-0'
    >
      <LuArrowUpDown size='16' />
      <span>{label}</span>
    </Button>
  );
};

export default ColumnHeaderButton;
