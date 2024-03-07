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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { decryptString } from '@/lib/encrypt';
import { initialiseState } from '@/lib/redux/features/apiKeys/apiKeys';
import { setEncryptedStatus } from '@/lib/redux/features/user/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getPassphraseSchema } from '@/schemas/getPassphraseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAPICredentials } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import bcryptjs from 'bcryptjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuUnlock } from 'react-icons/lu';
import { z } from 'zod';

const DecryptApiKeys = () => {
  const [open, setOpen] = useState(false); // dialog open state
  const dispatch = useAppDispatch(); // redux dispatch hook
  const { toast } = useToast(); // notification component hook
  const passphraseHash = useAppSelector(
    (state) => state.userContext.passphraseHash,
  );
  const apiKeysArr = useAppSelector((state) => state.apiKeys);

  const form = useForm<z.infer<typeof getPassphraseSchema>>({
    resolver: zodResolver(getPassphraseSchema),
    defaultValues: {
      passphrase: '',
    },
  });

  // function to handle on form submit
  const onSubmit = (data: z.infer<typeof getPassphraseSchema>) => {
    // cryptographically compare given passphrase to passphraseHash
    bcryptjs.compare(data.passphrase, passphraseHash, (err, res) => {
      // if user entered passphrase does not match send error to user
      if (!res)
        return form.setError('passphrase', {
          type: 'manual',
          message: 'Passphrase entered does not match with account passphrase.',
        });

      // mutate apiKeysArr and set to new array
      // TODO: this should probably be in a trycatch block to handle errors (?)
      const decryptedApiKeysArr = apiKeysArr.map(
        (apiKey: UserAPICredentials) => {
          return {
            ...apiKey, // spread apiKey object into new object
            apiSecret: decryptString(apiKey.apiSecret, data.passphrase), // decrypt apiSecret using user passphrase input and set as apiSecret in new array
          };
        },
      );

      dispatch(initialiseState(decryptedApiKeysArr)); // update redux store
      dispatch(setEncryptedStatus(false)); // set encrypted status
      // show success notification
      toast({
        title: 'Keys decrypted successfully!',
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <Button>
                <LuUnlock className='mr-2 h-4 w-4' /> Decrypt API Keys
              </Button>
            </DialogTrigger>
            <TooltipContent>
              <p className='w-[153px]'>
                Please enter your Passphrase to decrypt your keys.
              </p>
            </TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Encryption Passphrase</DialogTitle>
          <hr />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                      Your account passphrase is needed to decrypt your API
                      Keys.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Flex justify='center'>
                <Button type='submit'>Submit</Button>
              </Flex>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DecryptApiKeys;
