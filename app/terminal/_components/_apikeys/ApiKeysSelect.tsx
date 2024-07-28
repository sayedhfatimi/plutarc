'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { setAPIKey } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import type { TAPIKey } from '@/lib/types/APIKey';
import { LuInfo, LuKeyRound } from 'react-icons/lu';
import { toast } from 'sonner';
import ApiKeysDecryptionDialog from './ApiKeysDecryptionDialog';

const ApiKeysSelect = () => {
  const dispatch = useAppDispatch(); // redux dispatch hook
  const apiKeysArr = useAppSelector((state) => state.apiKeys);
  const APIKey = useAppSelector((state) => state.userContext.APIKey);
  const isEncrypted = useAppSelector(
    (state) => state.userContext.terminal.isEncrypted,
  );

  if (apiKeysArr.length === 0) return null; // check if user has any apiKeys otherwise return null

  if (isEncrypted) return <ApiKeysDecryptionDialog />; // since user has apiKeys check if they are currently encrypted if true return decryption component

  const handleValueChange = (option: string) => {
    dispatch(setAPIKey(JSON.parse(option)));
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
          Object.keys(APIKey).length === 0 ? undefined : JSON.stringify(APIKey)
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
          {apiKeysArr.map((item: TAPIKey) => (
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
