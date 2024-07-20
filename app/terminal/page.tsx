import ContentWrapper from '@/components/ContentWrapper';
import AppTray from './_components/AppTray';
import GridLayout from './_components/_terminal/GridLayout';

const TerminalPage = () => {
  return (
    <>
      <div className='max-h-full p-4'>
        <ContentWrapper className='h-full'>
          <GridLayout />
        </ContentWrapper>
      </div>
      <AppTray />
    </>
  );
};

export default TerminalPage;
