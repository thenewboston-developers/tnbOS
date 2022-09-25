import {Contacts, Deliveries, Messages} from 'apps/Chat/types';
import {RootState} from 'system/types';

export const getActiveChat = (state: RootState): string | null => state.chat.manager.activeChat;
export const getActiveNetworkId = (state: RootState): string | null => state.chat.manager.activeNetworkId;
export const getContacts = (state: RootState): Contacts => state.chat.contacts;
export const getDeliveries = (state: RootState): Deliveries => state.chat.deliveries;
export const getMessages = (state: RootState): Messages => state.chat.messages;
