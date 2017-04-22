import { combineReducers } from 'redux';

import addresses from './reducer_addresses';

const rootReducer = combineReducers({
  addresses
});

export default rootReducer;
