import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const NoAPIKeysAlert = () => {
  return (
    <Alert>
      <ExclamationTriangleIcon className='h-4 w-4' />
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

export default NoAPIKeysAlert;
