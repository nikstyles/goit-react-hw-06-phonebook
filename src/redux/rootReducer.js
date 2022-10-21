import { combineReducers } from '@reduxjs/toolkit';

import contacts from './contacts/contacts-slice';
import filter from './filter/filter-slice';

const rootReducer = combineReducers({
  contactsArr: contacts,
  filter,
});

export default rootReducer;
