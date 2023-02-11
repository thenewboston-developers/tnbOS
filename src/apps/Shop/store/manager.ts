import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_MANAGER} from 'apps/Shop/store/constants';
import {Manager, Page} from 'apps/Shop/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Manager = {
  activeBuyAddressId: null,
  activeBuyProductId: null,
  activePage: Page.buyHome,
  activeSellProductId: null,
};

const manager = createSlice({
  initialState,
  name: SHOP_MANAGER,
  reducers: {
    setActiveBuyAddressId: (state: Manager, {payload: activeBuyAddressId}: PayloadAction<string | null>) => {
      state.activeBuyAddressId = activeBuyAddressId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_MANAGER, state: current(state)});
    },
    setActiveBuyProductId: (state: Manager, {payload: activeBuyProductId}: PayloadAction<string | null>) => {
      state.activeBuyProductId = activeBuyProductId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_MANAGER, state: current(state)});
    },
    setActivePage: (state: Manager, {payload: activePage}: PayloadAction<Page>) => {
      state.activePage = activePage;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_MANAGER, state: current(state)});
    },
    setActiveSellProductId: (state: Manager, {payload: activeSellProductId}: PayloadAction<string | null>) => {
      state.activeSellProductId = activeSellProductId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_MANAGER, state: current(state)});
    },
    setManager: setLocalAndStateReducer<Manager>(SHOP_MANAGER),
  },
});

export const {setActiveBuyAddressId, setActiveBuyProductId, setActivePage, setActiveSellProductId, setManager} =
  manager.actions;
export default manager.reducer;
