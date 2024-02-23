'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { encryptString } from '@/lib/encrypt';
import { addApiKey } from '@/lib/redux/features/apiKeys/apiKeysSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import { gfwls } from '@/lib/utils';
import { createAPISchema } from '@/schemas/createAPISchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Callout, Flex } from '@radix-ui/themes';
import axios from 'axios';
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

  const onSubmit = async (data: UserAPICredential) => {
    try {
      setSubmitting(true);
      const { data: apiKeysObj } = await axios.post('/api/userApiCredentials', {
        ...data,
        userId: session!.user!.id,
        apiSecret: data.passphrase
          ? encryptString(data.apiSecret, data.passphrase) // encrypt api secret if passphrase is provided
          : data.apiSecret, // else send to server as plaintext
        passphrase: undefined, // set passphrase to undefined before sending data to server
      });

      const lsApiKeysObj = gfwls('userApiCredentials') || [];

      window.localStorage.setItem(
        'userApiCredentials',
        JSON.stringify([...lsApiKeysObj, { ...apiKeysObj }]),
      );

      dispatch(addApiKey({ ...apiKeysObj }));

      router.push('/settings/userApiCredentials');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
      console.error(error);
    }
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
                <Flex direction='column' gap='8'>
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
                            placeholder='Encryption Passphrase'
                            type='password'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          <p>
                            Enter a passphrase/password to be used to encrypt
                            your API secret before it is transmitted to the
                            server.
                          </p>
                          <p>
                            This is optional but be warned that your API secret
                            will be stored in plaintext on our servers if this
                            is not provided.
                          </p>
                          <p>Must be between 18 - 32 characters long.</p>
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    type='submit'
                    disabled={isSubmitting}
                    className='mt-4'
                  >
                    {isSubmitting && (
                      <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    Submit
                  </Button>
                </Flex>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </>
  );
};

export default UserApiCredentialForm;
