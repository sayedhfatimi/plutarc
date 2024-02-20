"use client";
import useGetApiKeys from "@/hooks/useGetApiKeys";
import { UserAPICredentials } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApiCredentialSelector = () => {
  const { data: apiKeysObj, isLoading } = useGetApiKeys();

  if (isLoading) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select API Account" />
        </SelectTrigger>
        <SelectContent>
          {apiKeysObj?.data.map((item: UserAPICredentials) => (
            <SelectItem key={item.label} value={item.apiKey}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ApiCredentialSelector;
