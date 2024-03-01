'use client';
import PageHeading from '@/app/auth/_components/PageHeading';
import { Box } from '@radix-ui/themes';

const DashboardPage = () => {
  return (
    <>
      <Box className='border bg-background p-2 shadow-sm'>
        <PageHeading
          heading='Dashboard'
          description='Overview of all account activities'
        />
      </Box>
    </>
  );
};

export default DashboardPage;
