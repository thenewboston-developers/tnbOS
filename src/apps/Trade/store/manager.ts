import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_MANAGER} from 'apps/Trade/store/constants';
import {Manager, Page, WalletTab} from 'apps/Trade/types';

export const initialState: Manager = {
  activePage: Page.buy,
  activeWalletTab: WalletTab.home,
};

const manager = createSlice({
  initialState,
  name: TRADE_MANAGER,
  reducers: {
    setActivePage: (state: Manager, {payload: page}: PayloadAction<Page>) => {
      state.activePage = page;
    },
    setActiveWalletTab: (state: Manager, {payload: walletTab}: PayloadAction<WalletTab>) => {
      state.activeWalletTab = walletTab;
    },
  },
});

export const {setActivePage, setActiveWalletTab} = manager.actions;
export default manager.reducer;
