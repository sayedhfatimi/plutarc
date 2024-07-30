// Generic WebSocket Response
export type TWebSocketResponse<T> = {
  table: string;
  action: 'partial' | 'update' | 'insert' | 'delete';
  data: T[];
  keys?: string[];
  types?: { [key: string]: string };
  filter?: { account?: number; symbol?: string };
};
