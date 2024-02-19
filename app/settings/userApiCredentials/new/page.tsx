"use client";
import PageHeading from "@/components/PageHeading";
import { Box } from "@radix-ui/themes";

const NewUserApiCredentialPage = () => {
  return (
    <Box className="border p-2 shadow-sm">
      <PageHeading
        heading="Add New API Key"
        description="Fill out form below to add a new account"
      />
    </Box>
  );
};

export default NewUserApiCredentialPage;
