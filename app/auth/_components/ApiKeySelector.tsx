'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setSelectedApiKey } from '@/lib/redux/features/apiKeys/selectedApiKey';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { UserAPIKeys } from '@prisma/client';
import React from 'react';
import { LuKeyRound } from 'react-icons/lu';
import DecryptApiKeys from './DecryptApiKeys';
import { toast } from 'sonner';

const ApiKeySelector = () => {
  const dispatch = useAppDispatch(); // redux dispatch hook
  const apiKeysArr = useAppSelector((state) => state.apiKeys);
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);
  const isEncrypted = useAppSelector((state) => state.userContext.isEncrypted);

  if (apiKeysArr.length === 0) return null; // check if user has any apiKeys otherwise return null

  if (isEncrypted) return <DecryptApiKeys />; // since user has apiKeys check if they are currently encrypted if true return decryption component

  const handleValueChange = (option: string) => {
    dispatch(setSelectedApiKey(JSON.parse(option)));
    toast.info(`Selected: ${JSON.parse(option).label}`);
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
        <SelectTrigger>
          <SelectValue placeholder={<LuKeyRound className='mx-2' />} />
        </SelectTrigger>
        <SelectContent position='popper' align='end'>
          {apiKeysArr.map((item: UserAPIKeys) => (
            <SelectItem key={item.label} value={JSON.stringify(item)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export const MemoApiKeySelector = React.memo(ApiKeySelector);
