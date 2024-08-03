'use client';
import { useVault } from '@/Providers/VaultProvider';
import SetPassphraseForm from '@/app/terminal/_components/SetPassphraseForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { SUPPORTED_EXCHANGES } from '@/lib/consts/terminal/supportedExchanges';
import { createApiKeySchema } from '@/schemas/createApiKeySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuPartyPopper, LuPlus, LuRefreshCw } from 'react-icons/lu';
import { toast } from 'sonner';
import type { z } from 'zod';

const ApiKeysAddForm = () => {
  const [open, setOpen] = useState(false);
  const passphraseHash = useVault((state) => state.user.passphraseHash);
  const addKey = useVault((state) => state.addKey);
  const setEncryptedStatus = useVault((state) => state.setEncryptedStatus);
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof createApiKeySchema>>({
    resolver: zodResolver(createApiKeySchema),
  });

  if (!passphraseHash) return <SetPassphraseForm />;

  const onSubmit = async (data: z.infer<typeof createApiKeySchema>) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    bcryptjs.compare(data.passphrase!, passphraseHash, async (_err, res) => {
      if (!res)
        return form.setError('passphrase', {
          type: 'manual',
          message: 'Passphrase entered does not match with account passphrase.',
        });
      setSubmitting(true);

      const apiKey = { ...data, id: nanoid(), passphrase: null };
      addKey(apiKey);

      setEncryptedStatus(false);

      setOpen(false);
      setSubmitting(false);
      form.reset();

      toast.success('Key Added!', {
        icon: <LuPartyPopper />,
        closeButton: true,
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='space-x-2' size='sm' variant='outline'>
          <LuPlus size={ICON_SIZE_SMALL} />
          <span>Add New Key</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New API Key</DialogTitle>
          <DialogDescription>
            Fill out form below to add a new account API.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className='space-y-6'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>Label</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder='Label' {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a name or label for identifying this key.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='apiKey'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>API Client ID</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder='API Client ID' {...field} />
                  </FormControl>
                  <FormDescription>
                    This will either be labelled API Client ID or API Key.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='apiSecret'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>API Client Secret</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder='API Client Secret' {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be labelled API Client Secret or API Secret.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='exchange'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>Exchange</FormLabel>
                  <FormMessage />
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an exchange...' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {SUPPORTED_EXCHANGES.map((option) => (
                        <SelectItem value={option.value} key={option.key}>
                          <div className='flex flex-row items-center space-x-2'>
                            <Image
                              src={option.icon}
                              alt={option.key}
                              height={22}
                              width={22}
                            />
                            <span>{option.text}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select an exchange from the list of supported exchange
                  </FormDescription>
                </FormItem>
              )}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='secondary'>Submit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Encryption Passphrase</DialogTitle>
                  <DialogDescription>
                    Please enter your encryption passphrase
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name='passphrase'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='sr-only'>
                        Encryption Passphrase
                      </FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Encryption Passphrase'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className='mt-4'
                >
                  {isSubmitting && (
                    <LuRefreshCw className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeysAddForm;
