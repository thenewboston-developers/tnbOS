import {combineReducers} from '@reduxjs/toolkit';

import contactsReducer from 'apps/Chat/store/contacts';
import deliveriesReducer from 'apps/Chat/store/deliveries';
import managerReducer from 'apps/Chat/store/manager';
import messagesReducer from 'apps/Chat/store/messages';

const chatReducer = combineReducers({
  contacts: contactsReducer,
  deliveries: deliveriesReducer,
  manager: managerReducer,
  messages: messagesReducer,
});

export default chatReducer;
