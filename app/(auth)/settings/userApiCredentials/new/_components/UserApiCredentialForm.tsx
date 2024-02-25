'use client';
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
import { UserAPICredential } from '@/entities/types';
import { decryptString, encryptString } from '@/lib/encrypt';
import { addApiKey } from '@/lib/redux/features/apiKeys/apiKeysSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import { createAPISchema } from '@/schemas/createAPISchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAPICredentials } from '@prisma/client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import axios from 'axios';
import bcryptjs from 'bcryptjs';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaExclamationTriangle } from 'react-icons/fa';
import { exchangeOptions } from './exchangeOptions';

const UserApiCredentialForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<UserAPICredential>({
    resolver: zodResolver(createAPISchema),
  });

  const passphraseHash: string = session!.user!.passphraseHash!;

  const onSubmit = async (data: UserAPICredential) => {
    bcryptjs.compare(data.passphrase!, passphraseHash, async (_err, res) => {
      if (!res)
        return form.setError('passphrase', {
          type: 'manual',
          message: 'Passphrase entered does not match with account passphrase.',
        });

      try {
        setSubmitting(true);

        const { data: apiKeysArr } = await axios.post<UserAPICredentials>(
          '/api/userApiCredentials',
          {
            ...data,
            userId: session!.user!.id,
            apiSecret: encryptString(data.apiSecret, data.passphrase!),
          },
        );

        dispatch(
          addApiKey({
            ...apiKeysArr,
            apiSecret: decryptString(apiKeysArr.apiSecret, data.passphrase!),
          }),
        );

        router.push('/settings/userApiCredentials');
        router.refresh();
      } catch (error) {
        setSubmitting(false);
        setError('An unexpected error occurred.');
        console.error(error);
      }
    });
  };

  return (
    <>
      {error && (
        <Callout.Root color='red' role='alert' className='mb-5'>
          <Callout.Icon>
            <FaExclamationTriangle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
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
                    {exchangeOptions.map((option) => (
                      <SelectItem value={option.value} key={option.key}>
                        {option.text}
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
                      <Input placeholder='Encryption Passphrase' {...field} />
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
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                )}
                Submit
              </Button>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </>
  );
};

export default UserApiCredentialForm;
