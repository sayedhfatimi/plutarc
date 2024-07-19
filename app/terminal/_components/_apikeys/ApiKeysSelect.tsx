'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setSelectedApiKey } from '@/lib/redux/features/selectedApiKey';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { LuInfo, LuKeyRound } from 'react-icons/lu';
import { toast } from 'sonner';
import ApiKeysDecryptionDialog from './ApiKeysDecryptionDialog';
import { TAPIKeys } from '@/lib/types/APIKeys';

const ApiKeysSelect = () => {
  const dispatch = useAppDispatch(); // redux dispatch hook
  const apiKeysArr = useAppSelector((state) => state.apiKeys);
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);
  const isEncrypted = useAppSelector((state) => state.userContext.isEncrypted);

  if (apiKeysArr.length === 0) return null; // check if user has any apiKeys otherwise return null

  if (isEncrypted) return <ApiKeysDecryptionDialog />; // since user has apiKeys check if they are currently encrypted if true return decryption component

  const handleValueChange = (option: string) => {
    dispatch(setSelectedApiKey(JSON.parse(option)));
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
          Object.keys(selectedApiKey).length === 0
            ? undefined
            : JSON.stringify(selectedApiKey)
        }
      >
        <SelectTrigger className='max-w-[300px]'>
          <SelectValue
            placeholder={
              <div className='flex items-center justify-start space-x-2'>
                <LuKeyRound size='16' />
                <span>Select an API Key</span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent position='item-aligned' align='end'>
          {apiKeysArr.map((item: TAPIKeys) => (
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
