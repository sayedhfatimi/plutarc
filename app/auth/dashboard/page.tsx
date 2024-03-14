'use client';
import PageHeading from '@/app/auth/_components/PageHeading';
import { Box } from '@radix-ui/themes';
import { LuLayoutDashboard } from 'react-icons/lu';

const DashboardPage = () => {
  return (
    <>
      <Box className='h-full w-full border bg-slate-200 p-1 shadow-sm dark:bg-background'>
        <PageHeading
          icon={<LuLayoutDashboard />}
          heading='Dashboard'
          description='Overview of all account activities'
        />
      </Box>
    </>
  );
};

export default DashboardPage;
