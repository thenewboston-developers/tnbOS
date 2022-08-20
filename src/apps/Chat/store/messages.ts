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
    deleteMessage: (state: Messages, {payload}: PayloadAction<Pick<Message, 'messageId' | 'modifiedDate'>>) => {
      const {messageId, modifiedDate} = payload;
      const message = state[messageId];
      message.content = '';
      message.modifiedDate = modifiedDate;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_MESSAGES, state: current(state)});
    },
    editMessageContent: (
      state: Messages,
      {payload}: PayloadAction<Pick<Message, 'content' | 'messageId' | 'modifiedDate'>>,
    ) => {
      const {content, messageId, modifiedDate} = payload;
      const message = state[messageId];
      message.content = content;
      message.modifiedDate = modifiedDate;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_MESSAGES, state: current(state)});
    },
    setMessage: (state: Messages, {payload}: PayloadAction<Message>) => {
      const {messageId} = payload;
      state[messageId] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_MESSAGES, state: current(state)});
    },
    setMessages: setLocalAndStateReducer<Messages>(CHAT_MESSAGES),
  },
});

export const {deleteMessage, editMessageContent, setMessage, setMessages} = messages.actions;
export default messages.reducer;
