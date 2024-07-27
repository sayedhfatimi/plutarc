// biome-ignore lint/style/useNodejsImportProtocol: throws error with nextjs
import { createHmac } from 'crypto';
// biome-ignore lint/style/useNodejsImportProtocol: throws error with nextjs
import querystring from 'querystring';
import type { TBitmexWebSocketResponse } from '@/lib/types/BitmexDataTypes';
import _ from 'lodash';

class BitMEXClient<T> {
  _DATA: {
    [key: string]: {
      [key: string]: any[];
    };
  } = {};
  _KEYS: { [key: string]: string | string[] } = {};
  WS_URL = 'wss://ws.bitmex.com/realtime';
  WS_AUTH_URL = '';
  private STORE_MAX_LENGTH = 10_000;

  getUrl(apiKey?: string, apiSecret?: string) {
    if (apiKey && apiSecret) {
      this.WS_AUTH_URL = `${this.WS_URL}?${this.getWSAuthQuery(apiKey, apiSecret)}`;
      return this.WS_AUTH_URL;
    }
    return this.WS_URL;
  }

  deltaParser<T>(
    tableName: string,
    symbol: string,
    wsResponse: TBitmexWebSocketResponse<T>,
  ) {
    switch (wsResponse.action) {
      case 'partial': {
        return this._partial<T>(tableName, symbol, wsResponse);
      }

      case 'insert': {
        return this._insert<T>(tableName, symbol, wsResponse);
      }

      case 'update': {
        return this._update<T>(tableName, symbol, wsResponse);
      }

      case 'delete': {
        return this._delete<T>(tableName, symbol, wsResponse);
      }
    }
  }

  // deltaParser Actions

  _partial<T>(
    tableName: string,
    symbol: string,
    wsResponse: TBitmexWebSocketResponse<T>,
  ) {
    if (!this._DATA[tableName]) this._DATA[tableName] = {};
    const wsData = wsResponse.data || [];

    this._DATA[tableName][symbol] = wsData;
    // biome-ignore lint/style/noNonNullAssertion: data exists at this point of code execution
    this._KEYS[tableName] = wsResponse?.keys!;

    return wsData;
  }

  _insert<T>(
    tableName: string,
    symbol: string,
    wsResponse: TBitmexWebSocketResponse<T>,
  ) {
    const store = this._DATA[tableName][symbol];

    const mutableStore = [...store, ...wsResponse.data];

    if (mutableStore.length > this.STORE_MAX_LENGTH) {
      mutableStore.splice(0, mutableStore.length - this.STORE_MAX_LENGTH);
    }

    return this.replaceStore<T>(tableName, symbol, mutableStore);
  }

  _update<T>(
    tableName: string,
    symbol: string,
    wsResponse: TBitmexWebSocketResponse<T>,
  ) {
    const store = this._DATA[tableName][symbol];

    const mutableStore = [...store] as T[];

    for (let i = 0; i < wsResponse.data.length; i++) {
      let payloadObj = wsResponse.data[i];

      const criteria = _.pick(payloadObj, this._KEYS[tableName]);
      const itemToUpdate: T = _.find(mutableStore, criteria) as T;

      if (itemToUpdate) {
        payloadObj = this.updateItem<T>(itemToUpdate, payloadObj);
        mutableStore[mutableStore.indexOf(itemToUpdate)] = payloadObj;
      }
    }

    return this.replaceStore<T>(tableName, symbol, mutableStore);
  }

  _delete<T>(
    tableName: string,
    symbol: string,
    wsResponse: TBitmexWebSocketResponse<T>,
  ) {
    const store = this._DATA[tableName][symbol];

    let mutableStore = [...store] as T[];

    for (let i = 0; i < wsResponse.data.length; i++) {
      const criteria = _.pick(wsResponse.data[i], this._KEYS[tableName]);
      const itemToRemove: T = _.find(mutableStore, criteria) as T;

      if (itemToRemove) {
        mutableStore = [..._.without(mutableStore, itemToRemove)] as T[];
      }
    }

    return this.replaceStore<T>(tableName, symbol, mutableStore);
  }

  // deltaParser Helper Functions

  replaceStore<T>(tableName: string, symbol: string, newData: T[]) {
    if (
      this._DATA[tableName][symbol] &&
      !Array.isArray(this._DATA[tableName][symbol])
    ) {
      this._DATA[tableName][symbol] = newData[0] as T[];
    } else {
      this._DATA[tableName][symbol] = newData;
    }
    return this._DATA[tableName][symbol];
  }

  updateItem<T>(item: T, newData: T) {
    return { ...item, ...newData };
  }

  // WS Auth Functions

  signMessage(
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

  getWSAuthQuery(apiKey: string, apiSecret: string) {
    const expires = Math.round(Date.now() / 1000) + 5;
    const query = {
      'api-expires': expires,
      'api-key': apiKey,
      'api-signature': this.signMessage(apiSecret, 'GET', '/realtime', expires),
    };

    return querystring.stringify(query);
  }

  getAuthObj(apiKey: string, apiSecret: string) {
    const expires = Math.round(Date.now() / 1000) + 5;
    return {
      'api-expires': expires,
      'api-key': apiKey,
      'api-signature': this.signMessage(apiSecret, 'GET', '/realtime', expires),
    };
  }
}

export const bitmexClient = new BitMEXClient();
