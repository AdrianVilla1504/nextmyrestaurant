import { combineReducers } from 'redux';
import productReducer from './product';
import uiReducer from './ui';
import userReducer from './user';
import checkoutReducer from './checkout';

const mainReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  ui: uiReducer,
  checkout: checkoutReducer,
});

export default mainReducer;
