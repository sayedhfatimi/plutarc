import { Box, Grid } from '@radix-ui/themes';

export default async function TerminalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Grid columns='5'>
        <Box className='col-span-4'>{children}</Box>
        <Grid className='place-content-center place-items-center'>
          <Box>Form Goes Here</Box>
        </Grid>
      </Grid>
    </>
  );
}
