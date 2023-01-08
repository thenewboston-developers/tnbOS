import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_ORDERS} from 'apps/Trade/store/constants';
import {
  ApprovalStatus,
  ApproveOrderParams,
  Order,
  Orders,
  PaymentStatus,
  SetFillStatusParams,
  SetPaymentStatusParams,
} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Orders = {};

const orders = createSlice({
  initialState,
  name: TRADE_ORDERS,
  reducers: {
    approveOrder: (state: Orders, {payload}: PayloadAction<ApproveOrderParams>) => {
      const {hostReceivingAddress, orderId} = payload;
      state[orderId].host.receivingAddress = hostReceivingAddress;
      state[orderId].approvalStatus = ApprovalStatus.approved;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_ORDERS, state: current(state)});
    },
    setApprovalStatus: (
      state: Orders,
      {payload}: PayloadAction<{approvalStatus: Exclude<ApprovalStatus, ApprovalStatus.approved>; orderId: string}>,
    ) => {
      const {approvalStatus, orderId} = payload;
      state[orderId].approvalStatus = approvalStatus;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_ORDERS, state: current(state)});
    },
    setFillStatus: (state: Orders, {payload}: PayloadAction<SetFillStatusParams>) => {
      const {fillStatus, orderId} = payload;
      state[orderId].fillStatus = fillStatus;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_ORDERS, state: current(state)});
    },
    setOrder: (state: Orders, {payload}: PayloadAction<Order>) => {
      const {orderId} = payload;
      state[orderId] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_ORDERS, state: current(state)});
    },
    setOrders: setLocalAndStateReducer<Orders>(TRADE_ORDERS),
    setPaymentStatus: (state: Orders, {payload}: PayloadAction<SetPaymentStatusParams>) => {
      const {orderId, paymentStatus} = payload;

      if (state[orderId].paymentStatus === PaymentStatus.complete && paymentStatus === PaymentStatus.complete) {
        throw new Error('Payment status already set to complete');
      }

      state[orderId].paymentStatus = paymentStatus;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_ORDERS, state: current(state)});
    },
  },
});

export const {approveOrder, setApprovalStatus, setFillStatus, setOrder, setOrders, setPaymentStatus} = orders.actions;
export default orders.reducer;
