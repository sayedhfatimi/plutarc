import NoAPIKeysAlert from "@/components/NoAPIKeysAlert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/lib/redux/hooks";
import { UserAPICredentials } from "@prisma/client";
import DeleteApiKeyButton from "./DeleteApiKeyButton";

const UserApiKeysTable = () => {
  const apiKeysObj = useAppStore().getState().apiKeys;

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
            <TableCell className="text-right">
              <Badge>{obj.apiKey}</Badge>
            </TableCell>
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
