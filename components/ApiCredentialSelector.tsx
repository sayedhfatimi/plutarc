"use client";
import { UserAPICredentials } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApiCredentialSelector = () => {
  const { data: apiKeysObj, isLoading } = useQuery({
    queryKey: ["userApiCredentials"],
    queryFn: async () => await axios.get("/api/userApiCredentials"),
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });

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
