import PageHeading from "@/components/PageHeading";
import { Box } from "@radix-ui/themes";

const HelpPage = () => {
  return (
    <>
      <Box className="border p-2 shadow-sm">
        <PageHeading
          heading="Help"
          description="Everything you need to know about plutarc"
        />
      </Box>
    </>
  );
};

export default HelpPage;
