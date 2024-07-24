import { BitmexWebSocketResponse } from '@/lib/types/BitmexDataTypes';
import _ from 'lodash';
import type { TBitmexClientData } from './bitmexClient';

export default function bitmexDeltaParser<T>(
  tableName: string,
  symbol: string,
  client: any,
  wsResponse: BitmexWebSocketResponse<T>,
  storeMaxLength: number = 10_000,
) {
  switch (wsResponse.action) {
    case 'partial': {
      return _partial(tableName, symbol, client, wsResponse);
    }

    case 'insert': {
      return _insert<T>(
        client._data,
        tableName,
        symbol,
        wsResponse,
        storeMaxLength,
      );
    }

    case 'update': {
      return _update<T>(
        client._data,
        tableName,
        symbol,
        wsResponse,
        client._keys[tableName],
      );
    }

    case 'delete': {
      return _delete<T>(
        client._data,
        tableName,
        symbol,
        wsResponse,
        client._keys[tableName],
      );
    }
  }
}

function _partial<T>(
  tableName: string,
  symbol: string,
  client: any,
  wsResponse: BitmexWebSocketResponse<T>,
) {
  if (!client._data[tableName]) client._data[tableName] = {};
  const wsData = wsResponse.data || [];

  client._data[tableName][symbol] = wsData;
  client._keys[tableName] = wsResponse!.keys!;

  return wsData;
}

function _insert<T>(
  context: TBitmexClientData<T>,
  tableName: string,
  symbol: string,
  wsResponse: BitmexWebSocketResponse<T>,
  storeMaxLength: number,
) {
  const store = context[tableName][symbol];

  const mutableStore = [...store, ...wsResponse.data];

  if (mutableStore.length > storeMaxLength) {
    mutableStore.splice(0, mutableStore.length - storeMaxLength);
  }

  return replaceStore<T>(context, tableName, symbol, mutableStore);
}

function _update<T>(
  context: TBitmexClientData<T>,
  tableName: string,
  symbol: string,
  wsResponse: BitmexWebSocketResponse<T>,
  keys: string | string[],
) {
  const store = context[tableName][symbol];

  const mutableStore = [...store] as T[];

  for (let i = 0; i < wsResponse.data.length; i++) {
    let payloadObj = wsResponse.data[i];

    const criteria = _.pick(payloadObj, keys);
    const itemToUpdate: T = _.find(mutableStore, criteria) as T;

    if (itemToUpdate) {
      payloadObj = updateItem(itemToUpdate, payloadObj);
      mutableStore[mutableStore.indexOf(itemToUpdate)] = payloadObj;
    }
  }

  return replaceStore<T>(context, tableName, symbol, mutableStore);
}

function _delete<T>(
  context: TBitmexClientData<T>,
  tableName: string,
  symbol: string,
  wsResponse: BitmexWebSocketResponse<T>,
  keys: string | string[],
) {
  const store = context[tableName][symbol];

  let mutableStore = [...store] as T[];

  for (let i = 0; i < wsResponse.data.length; i++) {
    const criteria = _.pick(wsResponse.data[i], keys);
    const itemToRemove: T = _.find(mutableStore, criteria) as T;

    if (itemToRemove) {
      mutableStore = [..._.without(mutableStore, itemToRemove)] as T[];
    }
  }

  return replaceStore<T>(context, tableName, symbol, mutableStore);
}

function replaceStore<T>(
  context: TBitmexClientData<T>,
  tableName: string,
  symbol: string,
  newData: any[],
) {
  if (
    context[tableName][symbol] &&
    !Array.isArray(context[tableName][symbol])
  ) {
    context[tableName][symbol] = newData[0];
  } else {
    context[tableName][symbol] = newData;
  }
  return context[tableName][symbol];
}

function updateItem(item: any, newData: any) {
  return { ...item, ...newData };
}
