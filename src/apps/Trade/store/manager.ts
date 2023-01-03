import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_MANAGER} from 'apps/Trade/store/constants';
import {Manager, Page, WalletTab} from 'apps/Trade/types';

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
    },
    setActiveWalletNetworkId: (state: Manager, {payload: activeWalletNetworkId}: PayloadAction<string | null>) => {
      state.activeWalletNetworkId = activeWalletNetworkId;
    },
    setActiveWalletTab: (state: Manager, {payload: activeWalletTab}: PayloadAction<WalletTab>) => {
      state.activeWalletTab = activeWalletTab;
    },
  },
});

export const {setActivePage, setActiveWalletNetworkId, setActiveWalletTab} = manager.actions;
export default manager.reducer;
