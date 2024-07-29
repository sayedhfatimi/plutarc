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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ICON_SIZE_LARGE, ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { initialiseState } from '@/lib/redux/features/apiKeys';
import { setEncryptedStatus } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import type { TAPIKey } from '@/lib/types/APIKey';
import { decryptString } from '@/lib/utils';
import { getPassphraseSchema } from '@/schemas/getPassphraseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import bcryptjs from 'bcryptjs';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuInfo, LuPartyPopper, LuUnlock } from 'react-icons/lu';
import { toast } from 'sonner';
import type { z } from 'zod';

const ApiKeysDecryptionDialog = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const apiKeysArr = useAppSelector((state) => state.apiKeys);

  const form = useForm<z.infer<typeof getPassphraseSchema>>({
    resolver: zodResolver(getPassphraseSchema),
    defaultValues: {
      passphrase: '',
    },
  });

  const onSubmit = (data: z.infer<typeof getPassphraseSchema>) => {
    bcryptjs.compare(
      data.passphrase,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      session?.user.passphraseHash!,
      (err, res) => {
        if (!res)
          return form.setError('passphrase', {
            type: 'manual',
            message:
              'Passphrase entered does not match with account passphrase.',
          });

        // TODO: this should probably be in a trycatch block to handle errors (?)
        const decryptedApiKeysArr = apiKeysArr.map((apiKey: TAPIKey) => {
          return {
            ...apiKey,
            apiSecret: decryptString(apiKey.apiSecret, data.passphrase),
          };
        });

        dispatch(initialiseState(decryptedApiKeysArr));
        dispatch(setEncryptedStatus(false));

        toast.success('Keys decrypted successfully!', {
          icon: <LuPartyPopper />,
          closeButton: true,
        });
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <HoverCard defaultOpen={false}>
        <HoverCardTrigger asChild>
          <DialogTrigger asChild>
            <Button className='space-x-2' size='sm'>
              <LuUnlock size={ICON_SIZE_SMALL} />
              <span>Decrypt API Keys</span>
            </Button>
          </DialogTrigger>
        </HoverCardTrigger>
        <HoverCardContent className='select-none space-y-2 font-mono'>
          <header className='flex flex-row items-center justify-start space-x-2'>
            <LuInfo size={ICON_SIZE_LARGE} />
            <div className='flex flex-col'>
              <h1 className='text-left text-2xl'>Info</h1>
              <span className='text-muted-foreground text-xs'>
                Your keys need decryption.
              </span>
            </div>
          </header>
          <Separator />
          <p className='text-pretty text-justify text-xs'>
            On initial load of the terminal or on a Hard Reload of the browser
            your API keys are retrieved from the server in an encrypted state,
            click this button and then follow the prompt to decrypt your keys.
          </p>
        </HoverCardContent>
      </HoverCard>
      <DialogContent className='select-none'>
        <DialogHeader>
          <DialogTitle>Encryption Passphrase</DialogTitle>
          <DialogDescription>
            Please enter your Passphrase to decrypt your keys.
          </DialogDescription>
        </DialogHeader>
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
                    Your account passphrase is needed to decrypt your API Keys.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className='flex justify-center'>
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeysDecryptionDialog;
