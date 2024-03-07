import { Blockquote, Box, Flex, Heading } from '@radix-ui/themes';

const PageHeading = ({
  heading,
  description,
  children,
}: {
  heading: string;
  description?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Flex justify='between' align='center' className='mb-2 border-b p-2'>
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
