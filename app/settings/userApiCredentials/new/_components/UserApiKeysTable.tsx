import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAPICredential } from "@/entities/types";
import { TrashIcon } from "@radix-ui/react-icons";

const UserApiKeysTable = () => {
  const apiKeysObj = JSON.parse(
    window.localStorage.getItem("userApiCredentials")!
  );

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
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeysObj &&
          apiKeysObj.map((obj: UserAPICredential) => (
            <TableRow key={obj.apiKey}>
              <TableCell>{obj.label}</TableCell>
              <TableCell>{obj.exchange}</TableCell>
              <TableCell className="text-right">{obj.apiKey}</TableCell>
              <TableCell className="text-center">
                <Button variant="destructive" size="icon">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UserApiKeysTable;