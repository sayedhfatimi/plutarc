'use client';
import SetPassphraseForm from '@/app/auth/_components/SetPassphraseForm';
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
import { useToast } from '@/components/ui/use-toast';
import { decryptString, encryptString } from '@/lib/encrypt';
import { addApiKey } from '@/lib/redux/features/apiKeys/apiKeys';
import { setEncryptedStatus } from '@/lib/redux/features/user/userContext';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/redux/hooks';
import { createAPISchema } from '@/schemas/createAPISchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAPICredentials } from '@prisma/client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import axios from 'axios';
import bcryptjs from 'bcryptjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaExclamationTriangle } from 'react-icons/fa';
import { LuPlus } from 'react-icons/lu';
import { z } from 'zod';
import { exchangeOptions } from './exchangeOptions';

const AddApiKeyForm = () => {
  const [open, setOpen] = useState(false); // dialog open state
  const dispatch = useAppDispatch(); // redux dispatch hook
  const userId = useAppStore().getState().userContext.userId;
  const passphraseHash = useAppSelector(
    (state) => state.userContext.passphraseHash,
  );
  const [error, setError] = useState(''); // error state
  const [isSubmitting, setSubmitting] = useState(false); // form submit state
  const { toast } = useToast(); // notification component hook

  const form = useForm<z.infer<typeof createAPISchema>>({
    resolver: zodResolver(createAPISchema),
  });

  if (passphraseHash === undefined || null) return <SetPassphraseForm />;

  // function to handle on form submit
  const onSubmit = async (data: z.infer<typeof createAPISchema>) => {
    // cryptographically compare given passphrase to passphraseHash
    bcryptjs.compare(data.passphrase!, passphraseHash, async (_err, res) => {
      // if user entered passphrase does not match send error to user
      if (!res)
        return form.setError('passphrase', {
          type: 'manual',
          message: 'Passphrase entered does not match with account passphrase.',
        });

      // if user entered passphrase matches with passphraseHash try submitting form
      try {
        // disable submit button and show loader
        setSubmitting(true);

        // TODO: convert to server action
        // send post request with mutated data to api endpoint
        const { data: apiKeyObj } = await axios.post<UserAPICredentials>(
          '/api/userApiCredentials',
          {
            ...data, // spread the form data into new empty object
            userId, // set the userId field
            apiSecret: encryptString(data.apiSecret, data.passphrase!), // encrypt the apiSecret before sending data
            passphrase: undefined, // set passphrase as undefined to not send passphrase over network
          },
        );

        // update the redux store with the returned data
        dispatch(
          addApiKey({
            ...apiKeyObj, // spread the received object into an empty object
            apiSecret: decryptString(apiKeyObj.apiSecret, data.passphrase!), // decrypt the apiSecret
          }),
        );

        // not really needed but for completion purposes
        dispatch(setEncryptedStatus(false));

        // close modal and reset form
        setOpen(false);
        setSubmitting(false);
        form.reset();

        // show success notification
        toast({
          title: 'Key Added!',
          description: `${apiKeyObj.label} has been added to your account.`,
        });
      } catch (error) {
        setSubmitting(false); // TODO: Handle this error better
        setError('An unexpected error occurred.'); // message displayed in Callout component
      }
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <LuPlus className='mr-2 h-4 w-4' /> Add New Key
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New API Key</DialogTitle>
            <DialogDescription>
              Fill out form below to add a new account API.
            </DialogDescription>
          </DialogHeader>

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
                      <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    Submit
                  </Button>
                </DialogContent>
              </Dialog>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddApiKeyForm;
