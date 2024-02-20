import { deleteApiKey } from "@/actions/_actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { removeApiKey } from "@/lib/redux/features/apiKeys/apiKeysSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { gfwls } from "@/lib/utils";
import { UserAPICredentials } from "@prisma/client";
import { useState } from "react";

const DeleteApiKeyButton = ({
  apiKeyObj,
}: {
  apiKeyObj: UserAPICredentials;
}) => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const confirmDeleteApiKey = async () => {
    try {
      setDeleting(true);
      await deleteApiKey(apiKeyObj.id);

      dispatch(removeApiKey(apiKeyObj));

      window.localStorage.setItem(
        "userApiCredentials",
        JSON.stringify(
          [...gfwls("userApiCredentials")].filter(
            (apiKey) => apiKey.id !== apiKeyObj.id
          )
        )
      );
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isDeleting}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={confirmDeleteApiKey}>
                DELETE!
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={error}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              An error occurred whilst attempting to delete. Please contact
              support.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setError(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteApiKeyButton;
