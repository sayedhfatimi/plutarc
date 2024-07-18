import ContentWrapper from '@/components/ContentWrapper';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LuBookKey, LuKeyRound } from 'react-icons/lu';
import DropdownDialogItem from '../DropdownDialogItem';

const ApiKeysDialog = () => {
  return (
    <DropdownDialogItem
      triggerIcon={<LuBookKey size='16' />}
      triggerTitle='API Keys'
    >
      <DialogHeader>
        <DialogTitle className='flex flex-row items-center space-x-2'>
          <LuKeyRound size='24' />
          <span>API Keys</span>
        </DialogTitle>
        <DialogDescription>Manage your API Keys Here</DialogDescription>
      </DialogHeader>
      <ContentWrapper>Manage API Keys here</ContentWrapper>
    </DropdownDialogItem>
  );
};

export default ApiKeysDialog;
