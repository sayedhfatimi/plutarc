import { Container, Flex } from '@radix-ui/themes';
import { getProviders } from 'next-auth/react';
import LoginProvidersButton from './_components/LoginProvidersButton';

const LoginPage = async () => {
  const providers = await getProviders();

  return (
    <>
      <Container>
        <Flex justify='center' align='center' className='md:h-screen'>
          <Flex
            position='relative'
            mx='auto'
            justify='center'
            align='center'
            direction='column'
            className='h-full max-h-[600px] w-full max-w-[400px] border'
          >
            {Object.values(providers!).map((provider) => (
              <div key={provider.id}>
                <LoginProvidersButton provider={provider} />
              </div>
            ))}
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default LoginPage;
