"use client";
import PageHeading from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import UserApiKeysTable from "./_components/UserApiKeysTable";
import { useAppStore } from "@/lib/redux/hooks";
import NoAPIKeysAlert from "@/components/NoAPIKeysAlert";

const UserAPICredentialsPage = () => {
  const apiKeysObj = useAppStore().getState().apiKeys;

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
      <Box className="border pb-2">
        {apiKeysObj.length === 0 ? (
          <NoAPIKeysAlert />
        ) : (
          <UserApiKeysTable apiKeysObj={apiKeysObj} />
        )}
      </Box>
    </Box>
  );
};

export default UserAPICredentialsPage;
