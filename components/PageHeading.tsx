import { Blockquote, Heading } from "@radix-ui/themes";

const PageHeading = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <>
      <Heading>{heading}</Heading>
      <Blockquote color="gray" size="2">
        {description}
      </Blockquote>
    </>
  );
};

export default PageHeading;
