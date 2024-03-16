'use client';
import PageHeading from '@/app/auth/_components/PageHeading';
import { LuLayoutDashboard } from 'react-icons/lu';
import PageWrapper from '../_components/PageWrapper';

const DashboardPage = () => {
  return (
    <>
      <PageWrapper>
        <PageHeading
          icon={<LuLayoutDashboard />}
          heading='Dashboard'
          description='Overview of all account activities'
        />
      </PageWrapper>
    </>
  );
};

export default DashboardPage;
