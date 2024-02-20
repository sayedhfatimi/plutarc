"use client";
import PageHeading from "@/components/PageHeading";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useGetApiKeys from "@/hooks/useGetApiKeys";
import { PlusIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import Link from "next/link";

const UserAPICredentialsPage = () => {
  const { data: apiKeysObj, isLoading } = useGetApiKeys();

  if (isLoading) return <Spinner />;

  return (
    <Box className="border p-2 shadow-sm">
      <PageHeading
        heading="Manage API Keys"
        description="manage your api keys here"
      >
        <Button asChild>
          <Link href="/settings/userApiCredentials/new">
            <PlusIcon className="mr-2 h-4 w-4" /> Add New Key
          </Link>
        </Button>
      </PageHeading>
    </Box>
  );
};

export default UserAPICredentialsPage;
