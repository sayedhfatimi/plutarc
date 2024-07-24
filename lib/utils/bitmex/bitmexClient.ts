import _ from 'lodash';
import crypto from 'crypto';
import querystring from 'querystring';

class BitmexClient<T> {
  invoke(): void {}
  _data: TBitmexClientData<T> = {} as TBitmexClientData<T>;
  _keys: TBitmexClientKeys = {} as TBitmexClientKeys;

  signMessage(
    secret: string,
    verb: string,
    url: string,
    nonce: number,
    data?: string | {},
  ) {
    if (!data || _.isEmpty(data)) data = '';
    else if (_.isObject(data)) data = JSON.stringify(data);

    return crypto
      .createHmac('sha256', secret)
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

export type TBitmexClientData<T> = {
  [key: string]: {
    [key: string]: T[];
  };
};

export type TBitmexClientKeys = { [key: string]: string | string[] };

export const bitmexClient = new BitmexClient();
