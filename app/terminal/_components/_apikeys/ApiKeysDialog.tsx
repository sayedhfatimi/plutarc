import ContentWrapper from '@/components/ContentWrapper';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ICON_SIZE_MEDIUM, ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { LuBookKey, LuKeyRound } from 'react-icons/lu';
import DropdownDialogItem from '../DropdownDialogItem';
import ApiKeysAddDialog from './ApiKeysAddDialog';
import ApiKeysTable from './ApiKeysTable';

const ApiKeysDialog = () => {
  return (
    <DropdownDialogItem
      triggerIcon={<LuBookKey size={ICON_SIZE_SMALL} />}
      triggerTitle='API Keys'
    >
      <div className='flex items-center justify-between pr-6'>
        <DialogHeader>
          <DialogTitle className='flex flex-row items-center space-x-2'>
            <LuKeyRound size={ICON_SIZE_MEDIUM} />
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
