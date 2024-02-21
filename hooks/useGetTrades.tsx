import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetTrades = (exchange: string, apiKey: string, apiSecret: string) => {
  return useQuery({
    queryKey: [exchange, "getTrades"],
    queryFn: async () =>
      await axios.post(`/api/${exchange.toLowerCase()}/getTrades`, {
        apiKey,
        apiSecret,
        exchange: exchange.toLowerCase(),
      }),
  });
};

export default useGetTrades;
