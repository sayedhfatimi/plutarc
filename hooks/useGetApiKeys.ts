import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetApiKeys = () => {
  return useQuery({
    queryKey: ["userApiCredentials"],
    queryFn: async () => await axios.get("/api/userApiCredentials"),
  });
};

export default useGetApiKeys;
