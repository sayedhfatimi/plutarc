import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const NoAPIKeysAlert = () => {
  return (
    <Box m="4">
      <Alert>
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>No account API keys stored.</AlertTitle>
        <AlertDescription>
          To add a BitMex account API Key, click on the Add New Key button
          above. Alternatively go to the Help section, from the menu, and follow
          the instructions to find out how to get your API Keys.
        </AlertDescription>
      </Alert>
    </Box>
  );
};

export default NoAPIKeysAlert;
