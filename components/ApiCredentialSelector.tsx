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
  });

  if (isLoading) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

  window.localStorage.setItem(
    "userApiCredentials",
    JSON.stringify(apiKeysObj?.data)
  );

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
