import {combineReducers} from '@reduxjs/toolkit';

import artworksReducer from 'apps/Art/store/artworks';
import managerReducer from 'apps/Art/store/manager';

const artReducer = combineReducers({
  artworks: artworksReducer,
  manager: managerReducer,
});

export default artReducer;
