import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserAPICredentials } from '@prisma/client';
import DeleteApiKeyButton from './DeleteApiKeyButton';
import { LuDelete } from 'react-icons/lu';
import { Flex } from '@radix-ui/themes';

const UserApiKeysTable = ({
  apiKeysArr,
}: {
  apiKeysArr: UserAPICredentials[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Label</TableHead>
          <TableHead>Exchange</TableHead>
          <TableHead className='text-right'>API Key</TableHead>
          <TableHead>
            <Flex justify='end' align='center'>
              <LuDelete />
            </Flex>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeysArr.map((apiKeyObj: UserAPICredentials) => (
          <TableRow key={apiKeyObj.apiKey}>
            <TableCell>
              <Badge variant='secondary'>{apiKeyObj.label}</Badge>
            </TableCell>
            <TableCell>{apiKeyObj.exchange}</TableCell>
            <TableCell className='text-right'>
              <Badge>{apiKeyObj.apiKey}</Badge>
            </TableCell>
            <TableCell className='text-right'>
              <DeleteApiKeyButton apiKeyObj={apiKeyObj} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserApiKeysTable;
