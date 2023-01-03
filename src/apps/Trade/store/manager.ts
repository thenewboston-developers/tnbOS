import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_MANAGER} from 'apps/Trade/store/constants';
import {Manager, Page, WalletTab} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Manager = {
  activePage: Page.buy,
  activeWalletNetworkId: null,
  activeWalletTab: WalletTab.home,
};

const manager = createSlice({
  initialState,
  name: TRADE_MANAGER,
  reducers: {
    setActivePage: (state: Manager, {payload: page}: PayloadAction<Page>) => {
      state.activePage = page;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_MANAGER, state: current(state)});
    },
    setActiveWalletNetworkId: (state: Manager, {payload: activeWalletNetworkId}: PayloadAction<string | null>) => {
      state.activeWalletNetworkId = activeWalletNetworkId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_MANAGER, state: current(state)});
    },
    setActiveWalletTab: (state: Manager, {payload: activeWalletTab}: PayloadAction<WalletTab>) => {
      state.activeWalletTab = activeWalletTab;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_MANAGER, state: current(state)});
    },
    setManager: setLocalAndStateReducer<Manager>(TRADE_MANAGER),
  },
});

export const {setActivePage, setActiveWalletNetworkId, setActiveWalletTab, setManager} = manager.actions;
export default manager.reducer;
