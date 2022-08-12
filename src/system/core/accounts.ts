import axios from 'axios';

import {CoreAccount} from 'system/types';
import {getAddress} from 'system/utils/addresses';

export const fetchAccount = async (accountNumber: string, networkId: string) => {
  const address = getAddress(networkId);
  const {data} = await axios.get<CoreAccount>(`${address}/api/accounts/${accountNumber}`);
  return data;
};
