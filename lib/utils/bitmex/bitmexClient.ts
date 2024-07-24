class BitmexClient<T> {
  invoke(): void {}
  _data: TBitmexClientData<T> = {} as TBitmexClientData<T>;
  _keys: TBitmexClientKeys = {} as TBitmexClientKeys;
}

export type TBitmexClientData<T> = {
  [key: string]: {
    [key: string]: T[];
  };
};

export type TBitmexClientKeys = { [key: string]: string | string[] };

export const bitmexClient = new BitmexClient();
