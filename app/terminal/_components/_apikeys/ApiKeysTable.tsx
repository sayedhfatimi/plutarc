'use client';
import { useVault } from '@/Providers/VaultProvider';
import { Badge } from '@/components/ui/badge';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import type { TAPIKey } from '@/lib/types/terminal/TAPIKey';
import { LuX } from 'react-icons/lu';
import ApiKeysAlert from './ApiKeysAlert';
import ApiKeysDeleteButton from './ApiKeysDeleteButton';

const ApiKeysTable = () => {
  const apiKeys = useVault((state) => state.eAPIKeys);

  if (apiKeys.length === 0) return <ApiKeysAlert />;

  return (
    <table className='w-full table-auto font-mono'>
      <thead className='border-b'>
        <tr>
          <th className='px-1 py-1 text-left'>Label</th>
          <th className='py-1 text-left'>Exchange</th>
          <th className='py-1 text-right'>API Key</th>
          <th className='py-1'>
            <div className='flex items-center justify-end px-1'>
              <LuX size={ICON_SIZE_SMALL} />
            </div>
          </th>
        </tr>
      </thead>
      <tbody className='divide-y'>
        {apiKeys.map((apiKey: TAPIKey) => (
          <tr key={apiKey.id} className='hover:bg-secondary'>
            <td className='py-2'>
              <Badge variant='secondary'>{apiKey.label}</Badge>
            </td>
            <td className='py-2'>{apiKey.exchange}</td>
            <td className='py-2 text-right'>
              <Badge>{apiKey.apiKey}</Badge>
            </td>
            <td className='py-2 text-right'>
              <ApiKeysDeleteButton apiKeyObj={apiKey} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApiKeysTable;
