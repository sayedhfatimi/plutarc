import { BitmexWebSocketResponse } from '@/lib/types/BitmexDataTypes';
import { createHmac } from 'crypto';
import _ from 'lodash';
import querystring from 'querystring';

class BitMEXClient {
  _DATA: { [key: string]: { [key: string]: any[] } } = {};
  _KEYS: { [key: string]: string | string[] } = {};
  STORE_MAX_LENGTH = 10_000;

  deltaParser<T>(
    tableName: string,
    symbol: string,
    wsResponse: BitmexWebSocketResponse<T>,
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
    wsResponse: BitmexWebSocketResponse<T>,
  ) {
    if (!this._DATA[tableName]) this._DATA[tableName] = {};
    const wsData = wsResponse.data || [];

    this._DATA[tableName][symbol] = wsData;
    this._KEYS[tableName] = wsResponse!.keys!;

    return wsData;
  }

  _insert<T>(
    tableName: string,
    symbol: string,
    wsResponse: BitmexWebSocketResponse<T>,
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
    wsResponse: BitmexWebSocketResponse<T>,
  ) {
    const store = this._DATA[tableName][symbol];

    const mutableStore = [...store] as T[];

    for (let i = 0; i < wsResponse.data.length; i++) {
      let payloadObj = wsResponse.data[i];

      const criteria = _.pick(payloadObj, this._KEYS[tableName]);
      const itemToUpdate: T = _.find(mutableStore, criteria) as T;

      if (itemToUpdate) {
        payloadObj = this.updateItem(itemToUpdate, payloadObj);
        mutableStore[mutableStore.indexOf(itemToUpdate)] = payloadObj;
      }
    }

    return this.replaceStore<T>(tableName, symbol, mutableStore);
  }

  _delete<T>(
    tableName: string,
    symbol: string,
    wsResponse: BitmexWebSocketResponse<T>,
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

  replaceStore<T>(tableName: string, symbol: string, newData: any[]) {
    if (
      this._DATA[tableName][symbol] &&
      !Array.isArray(this._DATA[tableName][symbol])
    ) {
      this._DATA[tableName][symbol] = newData[0];
    } else {
      this._DATA[tableName][symbol] = newData;
    }
    return this._DATA[tableName][symbol];
  }

  updateItem(item: any, newData: any) {
    return { ...item, ...newData };
  }

  // WS Auth Functions

  signMessage(
    secret: string,
    verb: string,
    url: string,
    nonce: number,
    data?: string | {},
  ) {
    if (!data || _.isEmpty(data)) data = '';
    else if (_.isObject(data)) data = JSON.stringify(data);

    return createHmac('sha256', secret)
      .update(verb + url + nonce + data)
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
}

export const bitmexClient = new BitMEXClient();
