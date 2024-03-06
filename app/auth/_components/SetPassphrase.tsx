'use client';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
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
import { createPassphrase } from '@/lib/_actions';
import { createPassphraseSchema } from '@/schemas/createPassphraseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex } from '@radix-ui/themes';
import bcryptjs from 'bcryptjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SetPassphrase() {
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
      }),
    );
  };

  return (
    <AlertDialog defaultOpen open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Encryption Passphrase</AlertDialogTitle>
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
                      Please enter a passphrase that will be used to encrypt the
                      API keys associated with this account.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Flex justify='center'>
                <Button type='submit'>Submit</Button>
              </Flex>
            </form>
          </Form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
