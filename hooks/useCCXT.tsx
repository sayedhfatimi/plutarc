import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useCCXT = (
  exchange: string,
  apiKey: string,
  apiSecret: string,
  endpoint: string
) => {
  return useQuery({
    queryKey: [endpoint, exchange, apiKey],
    queryFn: async () =>
      await axios.post(`/api/${exchange}/${endpoint}`, {
        apiKey,
        apiSecret,
        exchange,
      }),
    staleTime: 24 * 60 * 60 * 1000, //24h
  });
};

export default useCCXT;
