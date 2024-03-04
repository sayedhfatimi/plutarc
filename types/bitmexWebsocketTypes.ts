export interface orderBookL2_25 {
  table: string;
  action: string;
  data: orderBookL2_25_Data[];
}

export interface orderBookL2_25_Data {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
  timestamp: Date;
}
