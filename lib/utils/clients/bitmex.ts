// biome-ignore lint/style/useNodejsImportProtocol: importing browserified crypto
import { createHmac } from 'crypto';
// biome-ignore lint/style/useNodejsImportProtocol: importing browserified querystring
import querystring from 'querystring';
import type { TWebSocketResponse } from '@/lib/types/bitmex/TWebSocketResponse';
import _ from 'lodash';

type TBitMEXClient_DATA = { [key: string]: { [key: string]: any[] } };
type TBitMEXClient_KEYS = { [key: string]: string | string[] };

let instance: BitMEXClient;

class BitMEXClient {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  // private properties

  private _DATA: TBitMEXClient_DATA = {};
  private _KEYS: TBitMEXClient_KEYS = {};
  private STORE_MAX_LENGTH = 10_000;
  public WS_URL = 'wss://ws.bitmex.com/realtime';

  public deltaParser<T>(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>,
  ) {
    switch (wsResponse.action) {
      case 'partial': {
        return this._partial<T>(table, symbol, wsResponse);
      }

      case 'insert': {
        return this._insert<T>(table, symbol, wsResponse);
      }

      case 'update': {
        return this._update<T>(table, symbol, wsResponse);
      }

      case 'delete': {
        return this._delete<T>(table, symbol, wsResponse);
      }
    }
  }

  // deltaParser Actions

  private _partial<T>(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>,
  ) {
    if (!this._DATA[table]) this._DATA[table] = {};
    const wsData = wsResponse.data || [];

    this._DATA[table][symbol] = wsData;
    // biome-ignore lint/style/noNonNullAssertion: data exists at this point of code execution
    this._KEYS[table] = wsResponse?.keys!;

    return wsData;
  }

  private _insert<T>(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>,
  ) {
    const store = this._DATA[table][symbol];

    const mutableStore = [...store, ...wsResponse.data];

    if (mutableStore.length > this.STORE_MAX_LENGTH) {
      mutableStore.splice(0, mutableStore.length - this.STORE_MAX_LENGTH);
    }

    return this.replaceStore<T>(table, symbol, mutableStore);
  }

  private _update<T>(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>,
  ) {
    const store = this._DATA[table][symbol];

    const mutableStore = [...store] as T[];

    for (let i = 0; i < wsResponse.data.length; i++) {
      let payloadObj = wsResponse.data[i];

      const criteria = _.pick(payloadObj, this._KEYS[table]);
      const itemToUpdate: T = _.find(mutableStore, criteria) as T;

      if (itemToUpdate) {
        payloadObj = this.updateItem<T>(itemToUpdate, payloadObj);
        mutableStore[mutableStore.indexOf(itemToUpdate)] = payloadObj;
      }
    }

    return this.replaceStore<T>(table, symbol, mutableStore);
  }

  private _delete<T>(
    table: string,
    symbol: string,
    wsResponse: TWebSocketResponse<T>,
  ) {
    const store = this._DATA[table][symbol];

    let mutableStore = [...store] as T[];

    for (let i = 0; i < wsResponse.data.length; i++) {
      const criteria = _.pick(wsResponse.data[i], this._KEYS[table]);
      const itemToRemove: T = _.find(mutableStore, criteria) as T;

      if (itemToRemove) {
        mutableStore = [..._.without(mutableStore, itemToRemove)] as T[];
      }
    }

    return this.replaceStore<T>(table, symbol, mutableStore);
  }

  // deltaParser Helper Functions

  private replaceStore<T>(table: string, symbol: string, newData: T[]) {
    if (
      this._DATA[table][symbol] &&
      !Array.isArray(this._DATA[table][symbol])
    ) {
      this._DATA[table][symbol] = newData[0] as T[];
    } else {
      this._DATA[table][symbol] = newData;
    }
    return this._DATA[table][symbol];
  }

  private updateItem<T>(item: T, newData: T) {
    return { ...item, ...newData };
  }

  // WS Auth Functions

  private signMessage(
    secret: string,
    verb: string,
    url: string,
    nonce: number,
    data?: unknown,
  ) {
    let parsedData: typeof data;
    if (!data || _.isEmpty(data)) {
      parsedData = '';
    } else if (_.isObject(data)) {
      parsedData = JSON.stringify(data);
    }

    return createHmac('sha256', secret)
      .update(verb + url + nonce + parsedData)
      .digest('hex');
  }

  public getWSAuthQuery(apiKey: string, apiSecret: string) {
    const expires = Math.round(Date.now() / 1000) + 60_000;
    const query = {
      'api-expires': expires,
      'api-key': apiKey,
      'api-signature': this.signMessage(apiSecret, 'GET', '/realtime', expires),
    };

    return querystring.stringify(query);
  }

  public getAuthObj(
    apiKey: string,
    apiSecret: string,
    verb: string,
    url: string,
    data?: unknown,
  ) {
    const expires = Math.round(new Date().getTime() / 1000) + 60_000;

    return {
      'api-expires': expires,
      'api-key': apiKey,
      'api-signature': this.signMessage(apiSecret, verb, url, expires, data),
    };
  }
}

const bitmexClient = Object.freeze(new BitMEXClient());
export default bitmexClient;
