import ContentWrapper from '@/components/ContentWrapper';
import AppTray from './_components/AppTray';

const TerminalPage = () => {
  return (
    <>
      <div className='max-h-full p-4'>
        <ContentWrapper className='h-full'>
          <div>TerminalPage</div>
        </ContentWrapper>
      </div>
      <AppTray />
    </>
  );
};

export default TerminalPage;
