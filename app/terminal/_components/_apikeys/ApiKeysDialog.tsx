import ContentWrapper from '@/components/ContentWrapper';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LuBookKey, LuKeyRound } from 'react-icons/lu';
import DropdownDialogItem from '../DropdownDialogItem';
import ApiKeysTable from './ApiKeysTable';
import ApiKeysAddDialog from './ApiKeysAddDialog';

const ApiKeysDialog = () => {
  return (
    <DropdownDialogItem
      triggerIcon={<LuBookKey size='16' />}
      triggerTitle='API Keys'
    >
      <div className='flex items-center justify-between pr-6'>
        <DialogHeader>
          <DialogTitle className='flex flex-row items-center space-x-2'>
            <LuKeyRound size='24' />
            <span>API Keys</span>
          </DialogTitle>
          <DialogDescription>Manage your API Keys Here</DialogDescription>
        </DialogHeader>

        <ApiKeysAddDialog />
      </div>

      <ContentWrapper>
        <ApiKeysTable />
      </ContentWrapper>
    </DropdownDialogItem>
  );
};

export default ApiKeysDialog;
