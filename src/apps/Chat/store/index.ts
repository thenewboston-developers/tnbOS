import {combineReducers} from '@reduxjs/toolkit';

import contactsReducer from 'apps/Chat/store/contacts';
import managerReducer from 'apps/Chat/store/manager';

const chatReducer = combineReducers({
  contacts: contactsReducer,
  manager: managerReducer,
});

export default chatReducer;
