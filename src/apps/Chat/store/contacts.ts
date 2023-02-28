import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {CHAT_CONTACTS} from 'apps/Chat/store/constants';
import {Contact, Contacts} from 'apps/Chat/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Contacts = {};

const contacts = createSlice({
  initialState,
  name: CHAT_CONTACTS,
  reducers: {
    setContact: (state: Contacts, {payload}: PayloadAction<Contact>) => {
      const {accountNumber} = payload;
      const contact = state[accountNumber];
      state[accountNumber] = contact ? {...contact, ...payload} : payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_CONTACTS, state: current(state)});
    },
    setContacts: setLocalAndStateReducer<Contacts>(CHAT_CONTACTS),
    unsetContact: (state: Contacts, {payload: accountNumber}: PayloadAction<string>) => {
      delete state[accountNumber];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_CONTACTS, state: current(state)});
    },
  },
});

export const {setContact, setContacts, unsetContact} = contacts.actions;
export default contacts.reducer;
