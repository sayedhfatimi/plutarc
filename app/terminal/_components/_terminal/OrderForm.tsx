// biome-ignore lint/style/useNodejsImportProtocol: importing browserified crypto
import { createHmac } from 'crypto';
import { useVault } from '@/Providers/VaultProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import restRequest from '@/lib/actions/bitmex/restRequest';
import type { TGridComponentExtendedProps } from '@/lib/types/terminal/TGridComponentExtendedProps';
import { cn } from '@/lib/utils';
import classNames from 'classnames';
import React, { useState } from 'react';
import ApiKeysDecryptionDialog from '../_apikeys/ApiKeysDecryptionDialog';
import GridComponentTitleBar from './GridComponentTitleBar';

const OrderForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TGridComponentExtendedProps
>(
  (
    {
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      children,
      ...props
    },
    ref,
  ) => {
    const APIKeys = useVault((state) => state.dAPIKeys);
    const ticker = useVault((state) => state.terminal.ticker);
    const [orderType, setOrderType] = useState('limit');

    if (Object.keys(APIKeys).length === 0) {
      return (
        <div
          style={{ ...style }}
          className={cn('font-mono text-xs', className)}
          ref={ref}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}
          {...props}
        >
          {children}
          <GridComponentTitleBar item={props['data-grid']} />
          <div className='h-full place-content-center place-items-center text-center'>
            <ApiKeysDecryptionDialog />
          </div>
        </div>
      );
    }

    const handleSubmit = async (formData: FormData) => {
      const order = {
        type: orderType,
        ticker,
        size: formData.get('size'),
        price: formData.get('price'),
        side: formData.get('side'),
      };

      const verb = 'POST';
      const path = '/api/v1/order';

      for (const key of APIKeys) {
        switch (key.exchange) {
          case 'bitmex': {
            const expires = (
              Math.round(new Date().getTime() / 1000) + 60
            ).toString();
            const data = {
              symbol: order.ticker,
              side: order.side,
              orderQty: order.size,
              price: order.price,
            };

            const postBody = JSON.stringify(data);

            const signature = createHmac('sha256', key.apiSecret)
              .update(verb + path + expires + postBody)
              .digest('hex');

            const headers = {
              'content-type': 'application/json',
              Accept: 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'api-expires': expires,
              'api-key': key.apiKey,
              'api-signature': signature,
            };

            const res = await restRequest(verb, path, headers, postBody);
          }
        }
      }
    };

    return (
      <div
        style={{ ...style }}
        className={cn('font-mono text-xs', className)}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        {children}
        <GridComponentTitleBar item={props['data-grid']}>
          <div className='no-drag flex cursor-pointer flex-row space-x-2'>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: will implement later */}
            <div
              onClick={() => setOrderType('limit')}
              className={classNames({
                'px-2 py-1 hover:bg-secondary/50': true,
                'bg-secondary-foreground text-muted hover:text-muted-foreground':
                  orderType === 'limit',
              })}
            >
              Limit
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: will implement later */}
            <div
              onClick={() => setOrderType('market')}
              className={classNames({
                'px-2 py-1 hover:bg-secondary/50': true,
                'bg-secondary-foreground text-muted hover:text-muted-foreground':
                  orderType === 'market',
              })}
            >
              Market
            </div>
          </div>
        </GridComponentTitleBar>
        <form action={handleSubmit}>
          <div className='relative flex flex-row items-center justify-between px-1 py-2'>
            <Label
              htmlFor='size'
              className='pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-muted-foreground'
            >
              Size
            </Label>
            <Input
              id='size'
              type='text'
              name='size'
              className='pr-10 text-right'
              placeholder='000000'
              pattern='[0-9]*'
            />
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground'>
              USD
            </span>
          </div>
          <div className='relative flex flex-row items-center justify-between px-1 py-2'>
            <Label
              htmlFor='price'
              className='pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-muted-foreground'
            >
              Price
            </Label>
            <Input
              id='price'
              type='text'
              name='price'
              className='pr-10 text-right'
              placeholder='000000'
              pattern='[0-9]*'
            />
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground'>
              USD
            </span>
          </div>
          <div className='flex flex-row items-center justify-between space-x-2'>
            <Button
              type='submit'
              className='w-full rounded-none border-2 border-green-950 bg-green-800 font-bold text-white hover:bg-green-600'
              name='side'
              value='Buy'
            >
              Long
            </Button>
            <Button
              type='submit'
              className='w-full rounded-none border-2 border-red-950 bg-red-800 font-bold text-white hover:bg-red-600'
              name='side'
              value='Sell'
            >
              Short
            </Button>
          </div>
          <div className='flex flex-col space-y-4 py-2'>
            <span>Leverage</span>
            <Slider defaultValue={[0]} max={100} step={1} name='leverage' />
          </div>
        </form>
      </div>
    );
  },
);

OrderForm.displayName = 'OrderForm';

export default OrderForm;
