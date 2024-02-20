"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAPICredential } from "@/entities/types";
import { createAPISchema } from "@/schemas/createAPISchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { exchangeOptions } from "./exchangeOptions";

const UserApiCredentialForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<UserAPICredential>({
    resolver: zodResolver(createAPISchema),
  });

  const onSubmit = async (data: UserAPICredential) => {
    try {
      setSubmitting(true);
      await axios.post("/api/userApiCredentials", {
        ...data,
        userId: session!.user!.id,
      });
      router.push("/settings/userApiCredentials");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      {error && (
        <Callout.Root color="red" role="alert" className="mb-5">
          <Callout.Icon>
            <FaExclamationTriangle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Label</FormLabel>
                <FormControl>
                  <Input placeholder="Label" {...field} />
                </FormControl>
                <FormDescription>
                  Provide a name or label for identifying this key.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">API Client ID</FormLabel>
                <FormControl>
                  <Input placeholder="API Client ID" {...field} />
                </FormControl>
                <FormDescription>
                  This will either be labelled API Client ID or API Key.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">API Client Secret</FormLabel>
                <FormControl>
                  <Input placeholder="API Client Secret" {...field} />
                </FormControl>
                <FormDescription>
                  This will be labelled API Client Secret or API Secret.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exchange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Exchange</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exchange from the list" />
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
                  Select the exchange this key is from.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserApiCredentialForm;
