"use client";
import PageHeading from "@/components/PageHeading";
import { Box } from "@radix-ui/themes";

const UserAPICredentialsPage = () => {
  return (
    <Box className="border p-2 shadow-sm">
      <PageHeading
        heading="Manage API Keys"
        description="List of all APIs associated with this account"
      />
    </Box>
  );
};

export default UserAPICredentialsPage;
