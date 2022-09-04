import {combineReducers} from '@reduxjs/toolkit';

import contactsReducer from 'apps/Chat/store/contacts';
import deliveryStatusesReducer from 'apps/Chat/store/deliveryStatuses';
import managerReducer from 'apps/Chat/store/manager';
import messagesReducer from 'apps/Chat/store/messages';

const chatReducer = combineReducers({
  contacts: contactsReducer,
  deliveryStatuses: deliveryStatusesReducer,
  manager: managerReducer,
  messages: messagesReducer,
});

export default chatReducer;
