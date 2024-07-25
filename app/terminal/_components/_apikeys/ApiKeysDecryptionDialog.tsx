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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { initialiseState } from '@/lib/redux/features/apiKeys';
import { setEncryptedStatus } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { TAPIKeys } from '@/lib/types/APIKeys';
import { decryptString } from '@/lib/utils';
import { getPassphraseSchema } from '@/schemas/getPassphraseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import bcryptjs from 'bcryptjs';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuPartyPopper, LuUnlock } from 'react-icons/lu';
import { toast } from 'sonner';
import { z } from 'zod';

const ApiKeysDecryptionDialog = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false); // dialog open state
  const dispatch = useAppDispatch(); // redux dispatch hook

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
    bcryptjs.compare(
      data.passphrase,
      session?.user.passphraseHash!,
      (err, res) => {
        // if user entered passphrase does not match send error to user
        if (!res)
          return form.setError('passphrase', {
            type: 'manual',
            message:
              'Passphrase entered does not match with account passphrase.',
          });

        // mutate apiKeysArr and set to new array
        // TODO: this should probably be in a trycatch block to handle errors (?)
        const decryptedApiKeysArr = apiKeysArr.map((apiKey: TAPIKeys) => {
          return {
            ...apiKey, // spread apiKey object into new object
            apiSecret: decryptString(apiKey.apiSecret, data.passphrase), // decrypt apiSecret using user passphrase input and set as apiSecret in new array
          };
        });

        dispatch(initialiseState(decryptedApiKeysArr)); // update redux store
        dispatch(setEncryptedStatus(false)); // set encrypted status
        // show success notification
        toast.success('Keys decrypted successfully!', {
          icon: <LuPartyPopper />,
          closeButton: true,
        });
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className='space-x-2' size='sm'>
                <LuUnlock size={ICON_SIZE_SMALL} />
                <span>Decrypt API Keys</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className='w-[150px] text-pretty text-center'>
            Please enter your Passphrase to decrypt your keys.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
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
