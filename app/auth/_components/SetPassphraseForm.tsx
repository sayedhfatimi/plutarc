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
import { createPassphrase } from '@/lib/_actions';
import { setPassphraseHash } from '@/lib/redux/features/user/userContext';
import { useAppDispatch } from '@/lib/redux/hooks';
import { createPassphraseSchema } from '@/schemas/createPassphraseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex } from '@radix-ui/themes';
import bcryptjs from 'bcryptjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuLock } from 'react-icons/lu';
import { toast } from 'sonner';
import { z } from 'zod';

const SetPassphraseForm = () => {
  const [open, setOpen] = useState(false); // dialog open state
  const dispatch = useAppDispatch(); // redux dispatch hook

  const form = useForm<z.infer<typeof createPassphraseSchema>>({
    resolver: zodResolver(createPassphraseSchema),
    defaultValues: {
      passphrase: '',
      confirmPassphrase: '',
    },
  });

  const onSubmit = (data: z.infer<typeof createPassphraseSchema>) => {
    bcryptjs.genSalt(10, (err, salt) =>
      bcryptjs.hash(data.passphrase, salt, (err, hash) => {
        if (err) return { error: err.message }; // TODO: check error handling here
        createPassphrase({ passphrase: hash, confirmPassphrase: hash });
        dispatch(setPassphraseHash(hash));
        setOpen(false);

        toast.success('Passphrase set successfully!');
      }),
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <Button>
                <LuLock className='mr-2 h-4 w-4' />
                Set Passphrase
              </Button>
            </DialogTrigger>
            <TooltipContent>
              <p className='w-[153px]'>
                To add your API Keys to your account you must first set a
                Passphrase that will be used for End-to-End encryption.
              </p>
            </TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-2'>Encryption Passphrase</DialogTitle>
          <hr />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
              <FormField
                control={form.control}
                name='confirmPassphrase'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='sr-only'>
                      Confirm Passphrase
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        placeholder='Confirm Passphrase'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <p>
                        Please enter a passphrase that will be used to encrypt
                        the API keys associated with this account.
                      </p>
                      <p className='my-2 text-red-600'>
                        Please note: this passphrase is non recoverable. In the
                        instance that you forget this passphrase please go to
                        the documentation for instructions on how to reset.
                      </p>
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

export default SetPassphraseForm;
