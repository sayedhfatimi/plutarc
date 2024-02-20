import NoAPIKeysAlert from "@/components/NoAPIKeysAlert";
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
import { Badge } from "@/components/ui/badge";

const UserApiKeysTable = () => {
  const apiKeyStore = useStore();
  const apiKeysObj = apiKeyStore.getState();

  if (apiKeysObj.length === 0) return <NoAPIKeysAlert />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Label</TableHead>
          <TableHead>Exchange</TableHead>
          <TableHead className="text-right">API Key</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeysObj.map((obj: UserAPICredentials) => (
          <TableRow key={obj.apiKey}>
            <TableCell>
              <Badge variant="secondary">{obj.label}</Badge>
            </TableCell>
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
