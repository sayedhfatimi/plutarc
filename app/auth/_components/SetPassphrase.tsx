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
import { createPassphrase } from '@/lib/_actions';
import { createPassphraseSchema } from '@/schemas/createPassphraseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
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
        createPassphrase({ passphrase: hash, confirmPassphrase: hash });
      }),
    );
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
}
