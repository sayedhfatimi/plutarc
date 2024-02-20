"use client";
import { UserAPICredentials } from "@prisma/client";
import { useState } from "react";
import { useStore } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApiCredentialSelector = () => {
  const [selectedApiKey, setSelectedApiKey] = useState({});

  const apiKeyStore = useStore();
  const apiKeysObj = apiKeyStore.getState();

  return (
    <>
      <Select onValueChange={(option) => setSelectedApiKey(JSON.parse(option))}>
        <SelectTrigger>
          <SelectValue placeholder="Select API Account" />
        </SelectTrigger>
        <SelectContent>
          {apiKeysObj.map((item: UserAPICredentials) => (
            <SelectItem key={item.label} value={JSON.stringify(item)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ApiCredentialSelector;
