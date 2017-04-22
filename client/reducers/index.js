import { combineReducers } from 'redux';

import addresses from './reducer_addresses';
import myIdentity from './reducer_my_identity';

const rootReducer = combineReducers({
  addresses,
  myIdentity
});

export default rootReducer;
