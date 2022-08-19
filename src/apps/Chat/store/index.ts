import {combineReducers} from '@reduxjs/toolkit';

import contactsReducer from 'apps/Chat/store/contacts';
import managerReducer from 'apps/Chat/store/manager';
import messagesReducer from 'apps/Chat/store/messages';

const chatReducer = combineReducers({
  contacts: contactsReducer,
  manager: managerReducer,
  messages: messagesReducer,
});

export default chatReducer;
