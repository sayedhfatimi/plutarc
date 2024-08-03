'use client';
import { useVault } from '@/Providers/VaultProvider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import type { TAPIKey } from '@/lib/types/terminal/TAPIKey';
import { LuInfo, LuKeyRound } from 'react-icons/lu';
import { toast } from 'sonner';
import ApiKeysDecryptionDialog from './ApiKeysDecryptionDialog';

const ApiKeysSelect = () => {
  const APIKeys = useVault((state) => state.APIKeys);
  const selectedAPIKey = useVault((state) => state.terminal.selectedKey);
  const isEncrypted = useVault((state) => state.terminal.isEncrypted);
  const setSelectedKey = useVault((state) => state.setSelectedKey);

  if (APIKeys.length === 0) return null;

  if (isEncrypted) return <ApiKeysDecryptionDialog />;

  const handleValueChange = (option: string) => {
    setSelectedKey(JSON.parse(option));
    toast.info('API Key Selected', {
      description: `Selected: ${JSON.parse(option).label}`,
      icon: <LuInfo />,
      closeButton: true,
    });
  };

  return (
    <>
      <Select
        onValueChange={handleValueChange}
        value={
          Object.keys(selectedAPIKey).length === 0
            ? undefined
            : JSON.stringify(selectedAPIKey)
        }
      >
        <SelectTrigger className='max-w-[300px]'>
          <SelectValue
            placeholder={
              <div className='flex items-center justify-start space-x-2'>
                <LuKeyRound size={ICON_SIZE_SMALL} />
                <span>Select an API Key</span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent position='item-aligned' align='end'>
          {APIKeys.map((item: TAPIKey) => (
            <SelectItem key={item.label} value={JSON.stringify(item)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ApiKeysSelect;
