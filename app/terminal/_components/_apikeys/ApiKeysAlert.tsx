import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LuAlertTriangle } from 'react-icons/lu';

const ApiKeysAlert = () => {
  return (
    <Alert>
      <LuAlertTriangle size='16' />
      <AlertTitle>No account API keys stored.</AlertTitle>
      <AlertDescription>
        To add an account API Key, click the &apos;Add New Key&apos; button
        above.
        <br /> Alternatively go to the Help section, from the menu, and follow
        the instructions to find out how to get your API Keys.
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeysAlert;
