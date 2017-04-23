import { combineReducers } from 'redux';

import addresses from './reducer_addresses';
import myIdentity from './reducer_my_identity';
import searchedIdentity from './reducer_searched_identity';

const rootReducer = combineReducers({
  addresses,
  myIdentity,
  searchedIdentity
});

export default rootReducer;
