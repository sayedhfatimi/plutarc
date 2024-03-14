import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Box, Flex } from '@radix-ui/themes';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NoAPIKeysAlert = () => {
  const currentPath = usePathname();

  return (
    <Alert>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <AlertTitle>No account API keys stored.</AlertTitle>
      <AlertDescription>
        To add an account API Key,{' '}
        {currentPath === '/auth/settings/user-api-keys' ? (
          `click the Add New Key button above.`
        ) : (
          <span>
            go to the{' '}
            <Link
              href='/auth/settings/user-api-keys'
              className='underline hover:text-primary'
            >
              API Keys
            </Link>{' '}
            page.
          </span>
        )}
        <br />
        Alternatively go to the Help section, from the menu, and follow the
        instructions to find out how to get your API Keys.
      </AlertDescription>
    </Alert>
  );
};

export default NoAPIKeysAlert;
