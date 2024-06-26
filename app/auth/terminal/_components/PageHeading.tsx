import { Blockquote, Box, Flex, Heading } from '@radix-ui/themes';

const PageHeading = ({
  icon,
  heading,
  description,
  children,
}: {
  icon?: React.ReactNode;
  heading: string;
  description?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Flex
        justify='between'
        align='center'
        className='mb-2 border-b bg-white p-2 shadow-sm dark:bg-slate-900 md:bg-white/80 md:backdrop-blur dark:md:bg-slate-900/50'
      >
        <Flex align='center' className='p-2'>
          <Box asChild className='mr-6 h-8 w-8'>
            {icon}
          </Box>
          <Box>
            <Heading>{heading}</Heading>
            <Blockquote
              color='gray'
              size='2'
              weight='light'
              className='hidden md:block'
            >
              {description}
            </Blockquote>
          </Box>
        </Flex>
        <Box>{children}</Box>
      </Flex>
    </>
  );
};

export default PageHeading;
