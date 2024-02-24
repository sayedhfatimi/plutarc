'use client';
import { setSelectedApiKey } from '@/lib/redux/features/apiKeys/selectedApiKeySlice';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/redux/hooks';
import { UserAPICredentials } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const ApiCredentialSelector = () => {
  const dispatch = useAppDispatch();
  const apiKeysObj = useAppStore().getState().apiKeys;
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);

  if (apiKeysObj.length === 0) return null;

  const handleValueChange = (option: string) => {
    dispatch(setSelectedApiKey(JSON.parse(option)));

    window.localStorage.setItem('selectedApiKey', option);
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
          <SelectValue placeholder='Select API Account...' />
        </SelectTrigger>
        <SelectContent>
          {apiKeysObj.map((item: UserAPICredentials) => (
            <SelectItem key={item.label} value={JSON.stringify(item)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ApiCredentialSelector;
