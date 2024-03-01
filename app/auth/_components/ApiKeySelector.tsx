'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setSelectedApiKey } from '@/lib/redux/features/apiKeys/selectedApiKeySlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { UserAPICredentials } from '@prisma/client';
import { LuKeyRound } from 'react-icons/lu';

const ApiKeySelector = () => {
  const dispatch = useAppDispatch();
  const apiKeysArr = useAppSelector((state) => state.apiKeys);
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);

  if (apiKeysArr.length === 0) return null;

  const handleValueChange = (option: string) => {
    dispatch(setSelectedApiKey(JSON.parse(option)));
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
          {apiKeysArr.map((item: UserAPICredentials) => (
            <SelectItem key={item.label} value={JSON.stringify(item)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ApiKeySelector;
