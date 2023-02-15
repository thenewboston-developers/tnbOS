import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_PRODUCT_RECORD_RECIPIENTS} from 'apps/Shop/store/constants';
import {ProductRecordRecipient, ProductRecordRecipients} from 'apps/Shop/types';

export const initialState: ProductRecordRecipients = {};

const productRecordRecipients = createSlice({
  initialState,
  name: SHOP_PRODUCT_RECORD_RECIPIENTS,
  reducers: {
    resetProductRecordRecipients: () => initialState,
    setProductRecordRecipient: (
      state: ProductRecordRecipients,
      {payload: productRecordRecipient}: PayloadAction<ProductRecordRecipient>,
    ) => {
      const {accountNumber} = productRecordRecipient;
      state[accountNumber] = productRecordRecipient;
    },
    unsetProductRecordRecipient: (state: ProductRecordRecipients, {payload: accountNumber}: PayloadAction<string>) => {
      delete state[accountNumber];
    },
  },
});

export const {resetProductRecordRecipients, setProductRecordRecipient, unsetProductRecordRecipient} =
  productRecordRecipients.actions;
export default productRecordRecipients.reducer;
