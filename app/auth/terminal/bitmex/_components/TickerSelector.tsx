'use client';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getBitMexTickers } from '@/lib/_actions';
import { cn } from '@/lib/utils';
import { Instrument } from '@/types/BitmexDataTypes';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Box } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const TickerSelector = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  const searchParams = useSearchParams();

  const ticker = searchParams.get('ticker');

  const { data, isLoading }: { data?: Instrument[]; isLoading: boolean } =
    useQuery({
      queryKey: ['tickers'],
      queryFn: async () => await getBitMexTickers(),
    });

  if (isLoading)
    return (
      <Box className='p-4'>
        <Spinner />
      </Box>
    );

  if (!data) return null;

  const handleValueChange = (option: string) => {
    const params = new URLSearchParams();
    setValue(option);
    if (option) params.append('ticker', option);

    const query = params.size ? '?' + params.toString() : '';
    router.push(`/auth/terminal/bitmex${query}`);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[200px] justify-between'
          >
            {ticker ? ticker.toUpperCase() : 'Select a ticker...'}
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command shouldFilter loop>
            <CommandInput placeholder='Search tickers...' className='h-9' />
            <CommandList>
              <CommandEmpty>No ticker found.</CommandEmpty>
              <CommandGroup heading='Perpetual Futures'>
                {data
                  .filter((item: Instrument) => item.typ === 'FFWCSX')
                  .map((item: Instrument) => (
                    <CommandItem
                      key={item.symbol}
                      value={item.symbol}
                      onSelect={(currentValue) => {
                        handleValueChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      {item.symbol}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          value === item.symbol ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TickerSelector;
