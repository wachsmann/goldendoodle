import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alerts.reducer';
import { items } from './items.reducer';
import { unities } from './unities.reducer';
import { categories } from './categories.reducer';
import { stocks } from './stocks.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  items,
  unities,
  categories,
  stocks
});

export default rootReducer;