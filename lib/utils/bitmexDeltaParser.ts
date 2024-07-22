import _ from 'lodash';
import { BitmexWebSocketResponse } from '@/lib/types/BitmexDataTypes';

export default function bitmexDeltaParser<T>(
  JSONResponse: BitmexWebSocketResponse<T>, // JSON parsed websocket response from react-use-websocket
  data: T[], // state data
  setData: React.Dispatch<React.SetStateAction<T[]>>, // state action
  table: string, // data key
  storeMaxLength: number = 10_000, // maximum length of RecentTrades table, parameter? default = 100
) {
  // check the message exists
  let key = table === 'instrument' ? 'symbol' : 'id';
  if (JSONResponse !== undefined)
    if (
      JSONResponse !== null && // check the message is not empty
      JSONResponse.table === table // check the message is related to the relevant table
    ) {
      // server response -> data and action to perform
      switch (JSONResponse.action) {
        // server response: 'partial' -> initialise the data
        case 'partial': {
          setData(JSONResponse.data); // set data to initial response
          break;
        }

        // server response: 'insert' -> insert the data
        case 'insert': {
          let stateData = [...data, ...JSONResponse.data]; // spread the state data and the message data in a new array
          // check the length of the data array
          if (stateData.length > storeMaxLength) {
            stateData.splice(0, stateData.length - storeMaxLength); // mutate data array to limit length
          }

          setData(stateData); // set data to mutated data
          break;
        }

        // server response: 'update' -> update the state data
        case 'update': {
          let stateData = [...data]; // spread state data in a new array

          // loop over message data
          for (let i = 0; i < JSONResponse.data.length; i++) {
            let payloadObj = JSONResponse.data[i]; // get a single object from object array

            const criteria = _.pick(payloadObj, key); // create an object composed of the picked object properties
            const itemToUpdate: T = _.find(stateData, criteria) as T; // find the item with the set criteria in the state data

            // check if the message data contained an item that needed updating in the state
            if (itemToUpdate) {
              payloadObj = updateItem(itemToUpdate, payloadObj); // update the item
              stateData[stateData.indexOf(itemToUpdate)] = payloadObj; // insert the updated item back into the data array
            }
          }

          setData(stateData); // set data to mutated array
          break;
        }

        // server response: 'delete' -> delete item from state data
        case 'delete': {
          let stateData = [...data]; // spread state data in a new array

          // loop over message data
          for (let i = 0; i < JSONResponse.data.length; i++) {
            const criteria = _.pick(JSONResponse.data[i], key); // create an object composed of the picked object properties
            const itemToRemove: T = _.find(stateData, criteria) as T; // find the item with the set criteria in the state data

            // check if the message data contained an item that needed removing from the state
            if (itemToRemove) {
              stateData = [..._.without(stateData, itemToRemove)] as T[]; // return an array without the item matching criteria
            }
          }

          setData(stateData); // set data to mutated array
          break;
        }
      }
    }
}

function updateItem(item: any, newData: any) {
  return { ...item, ...newData };
}
