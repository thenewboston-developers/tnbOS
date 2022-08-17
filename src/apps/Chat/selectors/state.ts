import {RootState} from 'system/types';

export const getActiveChat = (state: RootState) => state.chat.manager.activeChat;
export const getContacts = (state: RootState) => state.chat.contacts;
