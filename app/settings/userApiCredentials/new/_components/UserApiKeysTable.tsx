import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAPICredentials } from "@prisma/client";
import { useStore } from "react-redux";
import DeleteApiKeyButton from "./DeleteApiKeyButton";

const UserApiKeysTable = () => {
  const apiKeyStore = useStore();
  const apiKeyObj = apiKeyStore.getState();

  return (
    <Table>
      <TableCaption>
        Current API Keys associated with this account.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Label</TableHead>
          <TableHead>Exchange</TableHead>
          <TableHead className="text-right">API Key</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeyObj.map((obj: UserAPICredentials) => (
          <TableRow key={obj.apiKey}>
            <TableCell>{obj.label}</TableCell>
            <TableCell>{obj.exchange}</TableCell>
            <TableCell className="text-right">{obj.apiKey}</TableCell>
            <TableCell className="text-right">
              <DeleteApiKeyButton apiKeyObj={obj} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserApiKeysTable;
