import {Contacts, DeliveryStatuses, Messages} from 'apps/Chat/types';
import {RootState} from 'system/types';

export const getActiveChat = (state: RootState): string | null => state.chat.manager.activeChat;
export const getContacts = (state: RootState): Contacts => state.chat.contacts;
export const getDeliveryStatuses = (state: RootState): DeliveryStatuses => state.chat.deliveryStatuses;
export const getMessages = (state: RootState): Messages => state.chat.messages;
