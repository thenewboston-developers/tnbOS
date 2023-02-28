import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {CHAT_MESSAGES} from 'apps/Chat/store/constants';
import {Message, Messages} from 'apps/Chat/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Messages = {};

const messages = createSlice({
  initialState,
  name: CHAT_MESSAGES,
  reducers: {
    setMessage: (state: Messages, {payload}: PayloadAction<Message>) => {
      const {messageId} = payload;
      state[messageId] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_MESSAGES, state: current(state)});
    },
    setMessages: setLocalAndStateReducer<Messages>(CHAT_MESSAGES),
    unsetMessages: (state: Messages, {payload: messageIds}: PayloadAction<string[]>) => {
      for (const messageId of messageIds) delete state[messageId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_MESSAGES, state: current(state)});
    },
  },
});

export const {setMessage, setMessages, unsetMessages} = messages.actions;
export default messages.reducer;
