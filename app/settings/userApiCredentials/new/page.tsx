"use client";
import PageHeading from "@/components/PageHeading";
import { createAPISchema } from "@/schemas/createAPISchema";
import { Box, Container } from "@radix-ui/themes";
import UserApiCredentialForm from "./_components/UserApiCredentialForm";

const NewUserApiCredentialPage = () => {
  return (
    <Box className="border p-2 shadow-sm">
      <PageHeading
        heading="Add New API Key"
        description="Fill out form below to add a new account API"
      />
      <Box className="p-9">
        <Container className="border shadow-md rounded-md p-8 ">
          <UserApiCredentialForm />
        </Container>
      </Box>
    </Box>
  );
};

export default NewUserApiCredentialPage;
