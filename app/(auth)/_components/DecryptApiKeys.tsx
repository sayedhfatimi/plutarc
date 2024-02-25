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
  const { apiKeysArr, setApiKeysArr } = useContext(ApiKeyContext);
  const { setEncrypted } = useContext(ApiKeyEncryptedContext);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof getPassphraseSchema>>({
    resolver: zodResolver(getPassphraseSchema),
    defaultValues: {
      passphrase: '',
    },
  });

  const onSubmit = (data: z.infer<typeof getPassphraseSchema>) => {
    bcryptjs.compare(data.passphrase, passphraseHash, (err, res) => {
      if (!res) return err;

      const decryptedApiKeysArr = apiKeysArr.map(
        (apiKey: UserAPICredentials) => {
          return {
            ...apiKey,
            apiSecret: decryptString(apiKey.apiSecret, data.passphrase),
          };
        },
      );

      dispatch(initialiseState(decryptedApiKeysArr));
      setApiKeysArr(decryptedApiKeysArr);
      setEncrypted(false);
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
