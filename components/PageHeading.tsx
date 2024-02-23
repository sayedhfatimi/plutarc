import { Blockquote, Box, Flex, Heading } from '@radix-ui/themes';
import { ReactNode } from 'react';

const PageHeading = ({
  heading,
  description,
  children,
}: {
  heading: string;
  description: string;
  children?: ReactNode;
}) => {
  return (
    <>
      <Flex justify='between' align='center' className='border-b p-2 mb-2'>
        <Box className='p-2'>
          <Heading>{heading}</Heading>
          <Blockquote color='gray' size='2' weight='light'>
            {description}
          </Blockquote>
        </Box>
        <Box>{children}</Box>
      </Flex>
    </>
  );
};

export default PageHeading;
