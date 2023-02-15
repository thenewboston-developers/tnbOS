import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_ORDERS} from 'apps/Shop/store/constants';
import {
  ApprovalStatus,
  ApproveOrderParams,
  Order,
  Orders,
  PaymentStatus,
  SetPaymentStatusParams,
} from 'apps/Shop/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Orders = {};

const orders = createSlice({
  initialState,
  name: SHOP_ORDERS,
  reducers: {
    approveOrder: (state: Orders, {payload}: PayloadAction<ApproveOrderParams>) => {
      const {orderId, receivingAddress} = payload;
      state[orderId].approvalStatus = ApprovalStatus.approved;
      state[orderId].receivingAddress = receivingAddress;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_ORDERS, state: current(state)});
    },
    setApprovalStatus: (
      state: Orders,
      {payload}: PayloadAction<{approvalStatus: Exclude<ApprovalStatus, ApprovalStatus.approved>; orderId: string}>,
    ) => {
      const {approvalStatus, orderId} = payload;
      state[orderId].approvalStatus = approvalStatus;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_ORDERS, state: current(state)});
    },
    setOrder: (state: Orders, {payload}: PayloadAction<Order>) => {
      const {orderId} = payload;
      state[orderId] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_ORDERS, state: current(state)});
    },
    setOrders: setLocalAndStateReducer<Orders>(SHOP_ORDERS),
    setPaymentStatus: (state: Orders, {payload}: PayloadAction<SetPaymentStatusParams>) => {
      const {orderId, paymentStatus} = payload;

      if (state[orderId].paymentStatus === PaymentStatus.complete && paymentStatus === PaymentStatus.complete) {
        throw new Error('Payment status already set to complete');
      }

      state[orderId].paymentStatus = paymentStatus;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_ORDERS, state: current(state)});
    },
  },
});

export const {approveOrder, setApprovalStatus, setOrder, setOrders, setPaymentStatus} = orders.actions;
export default orders.reducer;
