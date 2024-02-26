'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ApiKeyContext, ApiKeyEncryptedContext } from '@/lib/contexts/Contexts';
import { decryptString } from '@/lib/encrypt';
import { initialiseState } from '@/lib/redux/features/apiKeys/apiKeysSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import { getPassphraseSchema } from '@/schemas/getPassphraseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAPICredentials } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const DecryptApiKeys = ({ passphraseHash }: { passphraseHash: string }) => {
  const { apiKeysArr, setApiKeysArr } = useContext(ApiKeyContext); // React Context hook: apiKeysArr
  const { setEncrypted } = useContext(ApiKeyEncryptedContext); // React Context hook: apiKeysArr encrypted status
  const { toast } = useToast(); // notification component hook
  const dispatch = useAppDispatch(); // redux dispatch hook

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
      const decryptedApiKeysArr = apiKeysArr.map(
        (apiKey: UserAPICredentials) => {
          return {
            ...apiKey, // spread apiKey object into new object
            apiSecret: decryptString(apiKey.apiSecret, data.passphrase), // decrypt apiSecret using user passphrase input and set as apiSecret in new array
          };
        },
      );

      dispatch(initialiseState(decryptedApiKeysArr)); // update redux store
      setApiKeysArr(decryptedApiKeysArr); // update context with decrypted array (possibly redundant?)
      setEncrypted(false); // update encrypted context to unlock nested layout

      // show success notification
      toast({
        title: 'Keys decrypted successfully!',
      });
    });
  };

  return (
    <Dialog defaultOpen open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-4'>Encryption Passphrase</DialogTitle>
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
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DecryptApiKeys;
