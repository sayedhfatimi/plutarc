'use client';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppSelector } from '@/lib/redux/hooks';
import { TAPIKeys } from '@/lib/types/APIKeys';
import { LuDelete } from 'react-icons/lu';
import ApiKeysAlert from './ApiKeysAlert';
import ApiKeysDeleteButton from './ApiKeysDeleteButton';

const ApiKeysTable = () => {
  const apiKeys = useAppSelector((state) => state.apiKeys);

  if (apiKeys.length === 0) return <ApiKeysAlert />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Label</TableHead>
          <TableHead>Exchange</TableHead>
          <TableHead className='text-right'>API Key</TableHead>
          <TableHead>
            <div className='flex items-center justify-end'>
              <LuDelete size='1.5rem' />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeys.map((apiKey: TAPIKeys) => (
          <TableRow key={apiKey.apiKey}>
            <TableCell>
              <Badge variant='secondary'>{apiKey.label}</Badge>
            </TableCell>
            <TableCell>{apiKey.exchange}</TableCell>
            <TableCell className='text-right'>
              <Badge>{apiKey.apiKey}</Badge>
            </TableCell>
            <TableCell className='text-right'>
              <ApiKeysDeleteButton apiKeyObj={apiKey} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApiKeysTable;
